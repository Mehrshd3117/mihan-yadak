// // pages/api/products/index.js

// import { connectDB } from "../../../../lib/mongodb.js";
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

//     const { search = "", categorySlug = "" } = req.query;

//     const query = { isValid: true };

//     if (categorySlug) {
//       query.categorySlug = isNaN(categorySlug) ? categorySlug : parseInt(categorySlug);
//     }

//     let products = await Product.find(query).lean();

//     if (search.trim()) {
//       const lowerSearch = search.toLowerCase();
//       products = products.filter(product => {
//         if (product.title.toLowerCase().includes(lowerSearch)) return true;

//         if (product.description && Array.isArray(product.description)) {
//           return product.description.some(desc =>
//             desc.descTitle?.toLowerCase().includes(lowerSearch)
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

//     // خروجی استاندارد با data:
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
import Product from "../../../../models/Product";

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

    const { search = "", categorySlug = "", isTrending } = req.query;

    const query = { isValid: true };

    if (categorySlug) {
      query.categorySlug = isNaN(categorySlug) ? categorySlug : parseInt(categorySlug);
    }

    if (isTrending === "true") {
      query.isTrending = true;
    }

    let products = await Product.find(query).lean();

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      products = products.filter(product => {
        if (product.title?.toLowerCase().includes(lowerSearch)) return true;

        if (product.description && Array.isArray(product.description)) {
          return product.description.some(desc =>
            desc.descTitle?.toLowerCase().includes(lowerSearch)
          );
        }

        return false;
      });
    }

    // ✅ اگر درخواست برای ترندینگ بود → خروجی با data
    if (isTrending === "true") {
      return res.status(200).json({ data: products });
    }

    // ✅ در غیر این صورت همون خروجی قدیمی
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
