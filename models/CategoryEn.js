// models/CategoryEn.js
import mongoose from "mongoose";

const categoryEnSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.CategoryEn || mongoose.model("CategoryEn", categoryEnSchema, "categories-en");