// import express from "express";
// import isAuthenticated from "../Middlewares/isAuthenticated.js";
// import { createCheckoutSession, stripeWebhook } from "../Controllers/CoursePurchase.Controller.js";

// const router = express.Router();

// router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
// router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhook);
// router.route("/course/:courseId/detail-with-status").get();
// router.route("/").get();
// export default router;

import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  stripeWebhook,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourse,
} from "../Controllers/CoursePurchase.Controller.js";

const router = express.Router();

// Create Checkout Session
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

// Stripe Webhook
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

// ✅ Get course details with purchase status
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// ✅ Get all purchased courses
router
  .route("/")
  .get(isAuthenticated, getAllPurchasedCourse); // 👈 this is the one causing the 404

export default router;
