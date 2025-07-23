import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"], // fixed "complete" -> "completed"
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
      unique: true, // recommended to prevent duplicates
    },
  },
  { timestamps: true }
);

// export model
export const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);
