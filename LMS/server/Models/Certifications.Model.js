import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  publicId: { type: String, required: true }, // Ensure this field is defined and required
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  tag: { type: String },
  tagColor: { type: String },
  introduction: { type: String },
  key_1: { type: String },
  key_2: { type: String },
  key_3: { type: String },
  Course_Benefits: { type: String },
  Course_Benefits_2: { type: String },
  Course_Benefits_3: { type: String },
  Road_map: { type: [String] }, // Array of roadmap items
  syllabus_pdf: { type: String }, // New field for storing the PDF URL or path
  course_content: [{
    title: String,
    lessons: [{
      title: String,
      topics: [String]
    }]
  }],
  // New fields for requirements, exam details, and policies
  requirements: {
    experience: { type: [String] }, // Array of experience requirements
    decision_making: { type: String } // Decision making role description
  },
  exam_details: {
    format: { type: String }, // Exam format description
    duration: { type: String }, // Exam duration
    delivery: { type: [String] }, // Array of delivery methods
    windows: { type: String }, // Exam windows/schedule
    retake_fee: { type: String } // Retake fee amount
  },
  policies: {
    materials: { type: String }, // Materials policy
    id_requirements: { type: String }, // ID requirements
    refund_policy: { type: String } // Refund policy
  }
});

const Certification = mongoose.model("Certification", CertificationSchema);

export default Certification;