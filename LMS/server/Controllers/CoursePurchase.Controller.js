import Stripe from "stripe";
import { Course } from "../Models/Course.Model.js";
import { CoursePurchase } from "../Models/CoursePurchase.Model.js";
import { Lecture } from "../Models/Lecture.Model.js";
import { User } from "../Models/User.Model.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";  // Ensure the correct path to the middleware

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
export const createCheckoutSession = [
  isAuthenticated,  // Apply authentication middleware here
  async (req, res) => {
    try {
      const userId = req.user.id; // Use req.user.id from the JWT token
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing. Please authenticate." });
      }

      const { courseId } = req.body;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found!" });
      }

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.courseTitle,
                images: [course.courseThumbnail],
              },
              unit_amount: course.coursePrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/course-progress/${courseId}`,
        cancel_url: `http://localhost:5173/course-detail/${courseId}`,
        metadata: {
          courseId: courseId,
          userId: userId, // Ensure userId is passed in the metadata
        },
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
      });

      if (!session.url) {
        return res.status(400).json({ success: false, message: "Error while creating session" });
      }

      // Save the purchase record with paymentId BEFORE webhook
      const newPurchase = new CoursePurchase({
        courseId,
        userId,
        amount: course.coursePrice,
        status: "pending",
        paymentId: session.id,
      });
      await newPurchase.save();

      return res.status(200).json({
        success: true,
        url: session.url,
      });
    } catch (error) {
      console.log("createCheckoutSession error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
];

// Stripe webhook handler
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("✅ Stripe checkout.session.completed received");

    try {
      const session = event.data.object;
      const paymentId = session.id;
      const metadata = session.metadata || {};
      const { courseId, userId } = metadata;

      // Try to find the purchase
      let purchase = await CoursePurchase.findOne({ paymentId }).populate("courseId");

      // If not found, fallback to create it from metadata
      if (!purchase && courseId && userId) {
        const fallbackCourse = await Course.findById(courseId);
        if (fallbackCourse) {
          purchase = new CoursePurchase({
            courseId,
            userId,
            paymentId,
            amount: session.amount_total / 100,
            status: "completed",
          });
          await purchase.save();
        }
      }

      if (!purchase || !purchase.courseId) {
        console.error("❌ Purchase or courseId not found");
        return res.status(404).json({ message: "Purchase or courseId not found" });
      }

      purchase.status = "completed";
      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      // Unlock lectures
      if (purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Update course's enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );
    } catch (error) {
      console.error("❌ Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send();
};

// Get course detail with purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id; // Ensure the user is authenticated via the middleware

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log("getCourseDetailWithPurchaseStatus error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all purchased courses
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.log("getAllPurchasedCourse error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
