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
  slugFa: String,
  title: String,
  imgSrc: String,
  searchDesc: String,
  description: [DescriptionEnSchema],
  isValid: Boolean,
  isTrending: { type: Boolean, default: false },
  advices: [AdviceEnSchema],
  categorySlug: String,
},
{
  collection: 'products-en', // مشخص کردن اسم کلکشن
});


const ProductEn = mongoose.models.ProductEn || mongoose.model("ProductEn", ProductEnSchema);

export default ProductEn;
