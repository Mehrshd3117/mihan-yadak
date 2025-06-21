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
  slugEn: String,
  title: String,
  imgSrc: String,
  searchDesc: String,
  description: [DescriptionSchema],
  isValid: Boolean,
  isTrending: { type: Boolean, default: false },
  advices: [AdviceSchema],
  categorySlug: String,
},{
  collection: 'products', // مشخص کردن اسم کلکشن
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
