import mongoose from "mongoose";


const DescriptionEnSchema = new mongoose.Schema({
  descId: Number,
  descTitle: String,
});

const AdviceEnSchema = new mongoose.Schema({
  advId: Number,
  advTitle: String,
});



const ProductEnSchema = new mongoose.Schema({
  productId: Number,
  slug: String,
  title: String,
  imgSrc: String,
  searchDesc: String,
  description: [DescriptionEnSchema],
  isValid: Boolean,
  isTrending: { type: Boolean, default: false },
  advices: [AdviceEnSchema],
  categorySlug: String,
});


const ProductEn = mongoose.models.ProductEn || mongoose.model("ProductEn", ProductEnSchema, "products-en");

export default ProductEn;
