// models/faqs.js
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export default mongoose.models.Faqs || mongoose.model("Faqs", faqSchema);
