// // pages/api/categories/index.js

// import { connectDB } from "../../../lib/mongodb";
// import Category from "../../../models/Category";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).json({
//       status: 405,
//       message: `متد ${req.method} مجاز نیست.`,
//     });
//   }

//   try {
//     await connectDB();

//     const categories = await Category.find({}).lean();

//     if (!categories || categories.length === 0) {
//       return res.status(404).json({
//         status: 404,
//         message: "هیچ دسته‌بندی‌ای یافت نشد.",
//       });
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "دسته‌بندی‌ها با موفقیت دریافت شد.",
//       data: categories,
//     });
//   } catch (error) {
//     console.error("API /api/categories error:", error);
//     return res.status(500).json({
//       status: 500,
//       message: "خطای داخلی سرور",
//       error: error.message,
//     });
//   }
// }


// // pages/api/categories/index.js
// import { connectDB } from "../../../lib/mongodb";
// import Category from "../../../models/Category";
// import CategoryEn from "../../../models/CategoryEn";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).json({
//       status: 405,
//       message: `متد ${req.method} مجاز نیست.`,
//     });
//   }

//   try {
//     await connectDB();

//     const { locale } = req.query; // locale رو از کوئری می‌گیریم
//     let categories;

//     if (locale === "en") {
//       categories = await CategoryEn.find({}).lean(); // انگلیسی
//     } else {
//       categories = await Category.find({}).lean(); // پیش‌فرض فارسی
//     }

//     if (!categories || categories.length === 0) {
//       return res.status(404).json({
//         status: 404,
//         message: "هیچ دسته‌بندی‌ای یافت نشد.",
//       });
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "دسته‌بندی‌ها با موفقیت دریافت شد.",
//       data: categories,
//     });
//   } catch (error) {
//     console.error("API /api/categories error:", error);
//     return res.status(500).json({
//       status: 500,
//       message: "خطای داخلی سرور",
//       error: error.message,
//     });
//   }
// }



// pages/api/categories/index.js
import { connectDB } from "../../../lib/mongodb";
import Category from "../../../models/Category";
import CategoryEn from "../../../models/CategoryEn";

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

    const { locale } = req.query; // locale رو از کوئری می‌گیریم
    let categories;

    if (locale === "en") {
      categories = await CategoryEn.find({}).lean(); // انگلیسی
    } else {
      categories = await Category.find({}).lean(); // پیش‌فرض فارسی
    }

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "هیچ دسته‌بندی‌ای یافت نشد.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "دسته‌بندی‌ها با موفقیت دریافت شد.",
      data: categories,
    });
  } catch (error) {
    console.error("API /api/categories error:", error);
    return res.status(500).json({
      status: 500,
      message: "خطای داخلی سرور",
      error: error.message,
    });
  }
}