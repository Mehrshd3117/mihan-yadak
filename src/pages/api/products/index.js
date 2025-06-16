// // pages/api/products/index.js
// import { connectDB } from "../../../../lib/mongodb";
// import Product from "../../../../models/Product";

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

//     const { search = "", categorySlug = "", isTrending } = req.query;

//     const query = { isValid: true };

//     if (categorySlug) {
//       query.categorySlug = isNaN(categorySlug) ? categorySlug : parseInt(categorySlug);
//     }

//     if (isTrending === "true") {
//       query.isTrending = true;
//     }

//     let products = await Product.find(query).lean();

//     if (search.trim()) {
//       const lowerSearch = search.toLowerCase();
//       products = products.filter(product => {
//         if (product.title?.toLowerCase().includes(lowerSearch)) return true;

//         if (product.description && Array.isArray(product.description)) {
//           return product.description.some(desc =>
//             desc.descTitle?.toLowerCase().includes(lowerSearch)
//           );
//         }

//         return false;
//       });
//     }

//     // ✅ اگر درخواست برای ترندینگ بود → خروجی با data
//     if (isTrending === "true") {
//       return res.status(200).json({ data: products });
//     }

//     // ✅ در غیر این صورت همون خروجی قدیمی
//     return res.status(200).json(products);

//   } catch (error) {
//     console.error("API /api/products error:", error);
//     return res.status(500).json({
//       status: 500,
//       message: "خطا در دریافت لیست محصولات",
//       error: error.message,
//     });
//   }
// }


// // pages/api/products/index.js
// import { connectDB } from "../../../../lib/mongodb";
// import ProductFa from "../../../../models/Product";     // کالکشن پیش‌فرض (فارسی)
// import ProductEn from "../../../../models/ProductEn";   // کالکشنِ جدیدِ "producten"

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

//     const {
//       locale = "fa",
//       search = "",
//       categorySlug = "",
//       isTrending
//     } = req.query;

//     const Model = locale === "en" ? ProductEn : ProductFa;

//     const query = { isValid: true };
//     if (categorySlug) {
//       query.categorySlug = isNaN(categorySlug)
//         ? categorySlug
//         : parseInt(categorySlug, 10);
//     }
//     if (isTrending === "true") {
//       query.isTrending = true;
//     }

//     let products = await Model.find(query).lean();

//     if (search.trim()) {
//       const q = search.toLowerCase();
//       products = products.filter(p => {
//         if (p.title?.toLowerCase().includes(q)) return true;
//         if (Array.isArray(p.description)) {
//           return p.description.some(d =>
//             d.descTitle?.toLowerCase().includes(q)
//           );
//         }
//         return false;
//       });
//     }

//     return res.status(200).json(products);
//   } catch (error) {
//     console.error("API /api/products error:", error);
//     return res.status(500).json({
//       status: 500,
//       message: "خطا در دریافت لیست محصولات",
//       error: error.message,
//     });
//   }
// }


// pages/api/products/index.js
import { connectDB } from "../../../../lib/mongodb";
import ProductFa from "../../../../models/Product";     // کالکشن "products"
import ProductEn from "../../../../models/ProductEn";   // کالکشن "producten"

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

    const {
      locale = "fa",       // ?locale=fa یا ?locale=en
      search = "",
      categorySlug = "",
      isTrending
    } = req.query;

    // لاگ برای دیباگ
    console.log("→ locale:", locale);


    const Model = locale === "en" ? ProductEn : ProductFa;
    console.log("Mehrshadddddddddddd", Model.collection.name);

    // پایه کوئری
    const query = { isValid: true };
    if (categorySlug) {
      query.categorySlug = isNaN(categorySlug)
        ? categorySlug
        : parseInt(categorySlug, 10);
    }
    if (isTrending === "true") {
      query.isTrending = true;
    }

    console.log("→ Mongo query:", query);

    let products = await Model.find(query).lean();
    console.log("→ Found products count:", products.length);

    // فیلتر جستجو
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(p => {
        if (p.title?.toLowerCase().includes(q)) return true;
        if (Array.isArray(p.description)) {
          return p.description.some(d =>
            d.descTitle.toLowerCase().includes(q)
          );
        }
        return false;
      });
      console.log("→ After search filter:", products.length);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("API /api/products error:", error);
    return res.status(500).json({
      status: 500,
      message: "خطا در دریافت لیست محصولات",
      error: error.message,
    });
  }
}
