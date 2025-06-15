// models/Product.js
import mongoose from "mongoose";

const DescriptionSchema = new mongoose.Schema({
  descId: Number,
  descTitle: String,
});

const AdviceSchema = new mongoose.Schema({
  advId: Number,
  advTitle: String,
});

const ProductSchema = new mongoose.Schema({
  productId: Number,
  slug: String,
  title: String,
  imgSrc: String,
  searchDesc: String,
  description: [DescriptionSchema],
  isValid: Boolean,
  isTrending: { type: Boolean, default: false }, // ✅ اضافه شد
  advices: [AdviceSchema],
  categorySlug: String,
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
