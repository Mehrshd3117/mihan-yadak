// pages/api/faqs/index.js
import { connectDB } from "../../../../lib/mongodb";
import Faqs from "../../../../models/Faqs";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      status: 405,
      message: `متد ${req.method} مجاز نیست.`,
    });
  }

  try {
    await connectDB();
    const faqs = await Faqs.find({}).lean();

    if (!faqs || faqs.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "هیچ سوالی پیدا نشد.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "سوالات با موفقیت دریافت شدند.",
      data: faqs,
    });
  } catch (error) {
    console.error("API /api/faqs error:", error);
    return res.status(500).json({
      status: 500,
      message: "خطا در دریافت سوالات متداول.",
      error: error.message,
    });
  }
}
