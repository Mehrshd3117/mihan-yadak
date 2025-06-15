// pages/api/products/[slug].js
import { connectDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const product = await Product.findOne({ slug, isValid: true }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found or invalid" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product from DB:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
