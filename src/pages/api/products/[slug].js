// // pages/api/products/[slug].js
// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({
//       status: 405,
//       message: `Method ${req.method} not allowed.`,
//     });
//   }

//   try {
//     await connectDB();

//     let { slug, locale = 'fa' } = req.query;
//     slug = decodeURIComponent(slug);

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: locale === 'en' ? 'Slug is required.' : 'اسلاگ الزامی است.',
//       });
//     }

//     const collection = locale === 'en' ? ProductEn : Product;

//     const product = await collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: locale === 'en' ? 'Product not found.' : 'محصول یافت نشد.',
//       });
//     }

//     const responseProduct = {
//       slug: product.slug,
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((desc) => ({
//         descId: desc.descId,
//         descTitle: desc.descTitle,
//       })),
//       advices: product.advices?.map((adv) => ({
//         advId: adv.advId,
//         advTitle: adv.advTitle,
//       })),
//       locale,
//     };

//     return res.status(200).json(responseProduct);
//   } catch (error) {
//     console.error('Error in product API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: locale === 'en' ? 'Internal server error.' : 'خطای داخلی سرور.',
//       error: error.message,
//     });
//   }
// }




// // pages/api/products/[slug].js
// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({ status: 405, message: `Method ${req.method} not allowed.` });
//   }

//   try {
//     await connectDB();

//     let { slug, locale = 'fa' } = req.query;
//     slug = decodeURIComponent(slug);

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: locale === 'en' ? 'Slug is required.' : 'اسلاگ الزامی است.',
//       });
//     }

//     const Collection = locale === 'en' ? ProductEn : Product;
//     const product = await Collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: locale === 'en' ? 'Product not found.' : 'محصول یافت نشد.',
//       });
//     }

//     // فقط فیلدهای مورد نیاز را برمی‌گردانیم
//     return res.status(200).json({
//       slug: product.slug,
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((d) => ({
//         descId: d.descId,
//         descTitle: d.descTitle,
//       })),
//       advices: product.advices?.map((a) => ({
//         advId: a.advId,
//         advTitle: a.advTitle,
//       })),
//       locale,
//     });
//   } catch (error) {
//     console.error('Error in product/[slug] API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: locale === 'en' ? 'Internal server error.' : 'خطای داخلی سرور.',
//       error: error.message,
//     });
//   }
// }

// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({
//       status: 405,
//       message: `Method ${req.method} not allowed.`,
//     });
//   }

//   try {
//     await connectDB();

//     let { slug, locale = 'fa' } = req.query;
//     slug = decodeURIComponent(slug);

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: locale === 'en' ? 'Slug is required.' : 'اسلاگ الزامی است.',
//       });
//     }

//     const Collection = locale === 'en' ? ProductEn : Product;
//     const product = await Collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: locale === 'en' ? 'Product not found.' : 'محصول یافت نشد.',
//       });
//     }

//     // اضافه کردن اسلاگ زبان مقابل
//     const otherSlug = locale === 'fa' ? product.slugEN : product.slugFa;

//     const responseProduct = {
//       slug: product.slug,
//       otherSlug, // اسلاگ زبان مقابل
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((desc) => ({
//         descId: desc.descId,
//         descTitle: desc.descTitle,
//       })),
//       advices: product.advices?.map((adv) => ({
//         advId: adv.advId,
//         advTitle: adv.advTitle,
//       })),
//       locale,
//     };

//     return res.status(200).json(responseProduct);
//   } catch (error) {
//     console.error('Error in product API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: locale === 'en' ? 'Internal server error.' : 'خطای داخلی سرور.',
//       error: error.message,
//     });
//   }
// }



// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({
//       status: 405,
//       message: `Method ${req.method} not allowed.`,
//     });
//   }

//   try {
//     await connectDB();

//     let { slug } = req.query;
//     slug = decodeURIComponent(slug);

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: 'Slug is required.',
//       });
//     }

//     // تشخیص زبان از مسیر
//     const isEnglish = req.headers['x-invoke-path'].includes('/en/');
//     const Collection = isEnglish ? ProductEn : Product;
//     const product = await Collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: 'Product not found.',
//       });
//     }

//     const otherSlug = isEnglish ? product.slugFa : product.slugEN;

//     const responseProduct = {
//       slug: product.slug,
//       otherSlug,
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((desc) => ({
//         descId: desc.descId,
//         descTitle: desc.descTitle,
//       })),
//       advices: product.advices?.map((adv) => ({
//         advId: adv.advId,
//         advTitle: adv.advTitle,
//       })),
//     };

//     return res.status(200).json(responseProduct);
//   } catch (error) {
//     console.error('Error in product API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: 'Internal server error.',
//       error: error.message,
//     });
//   }
// }

// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({
//       status: 405,
//       message: `Method ${req.method} not allowed.`,
//     });
//   }

//   try {
//     await connectDB();

//     let { slug } = req.query;
//     slug = decodeURIComponent(slug);
//     const locale = req.query.locale || 'fa'; // پیش‌فرض fa اگه locale نباشه

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: 'Slug is required.',
//       });
//     }

//     const Collection = locale === 'en' ? ProductEn : Product;
//     const product = await Collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: 'Product not found.',
//       });
//     }

//     const otherSlug = locale === 'en' ? (product.slugFa || '') : (product.slugEN || '');

//     const responseProduct = {
//       slug: product.slug,
//       otherSlug,
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((desc) => ({
//         descId: desc.descId,
//         descTitle: desc.descTitle,
//       })) || [],
//       advices: product.advices?.map((adv) => ({
//         advId: adv.advId,
//         advTitle: adv.advTitle,
//       })) || [],
//     };

//     return res.status(200).json(responseProduct);
//   } catch (error) {
//     console.error('Error in product API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: 'Internal server error.',
//       error: error.message,
//     });
//   }
// }


// import { connectDB } from '../../../../lib/mongodb';
// import Product from '../../../../models/Product';
// import ProductEn from '../../../../models/ProductEn';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({
//       status: 405,
//       message: `Method ${req.method} not allowed.`,
//     });
//   }

//   try {
//     await connectDB();

//     let { slug } = req.query;
//     slug = decodeURIComponent(slug);
//     const locale = req.query.locale || 'fa'; // پیش‌فرض fa اگه locale نباشه

//     if (!slug) {
//       return res.status(400).json({
//         status: 400,
//         message: 'Slug is required.',
//       });
//     }

//     const Collection = locale === 'en' ? ProductEn : Product;
//     const product = await Collection.findOne({ slug }).lean();

//     if (!product) {
//       return res.status(404).json({
//         status: 404,
//         message: 'Product not found.',
//       });
//     }

//     // استفاده از slugFa و slugEn به جای otherSlug
//     const otherSlug = locale === 'en' ? product.slugFa : product.slugEn;

//     const responseProduct = {
//       slug: product.slug,
//       otherSlug,
//       title: product.title,
//       imgSrc: product.imgSrc,
//       productId: product.productId,
//       categorySlug: product.categorySlug,
//       description: product.description?.map((desc) => ({
//         descId: desc.descId,
//         descTitle: desc.descTitle,
//       })) || [],
//       advices: product.advices?.map((adv) => ({
//         advId: adv.advId,
//         advTitle: adv.advTitle,
//       })) || [],
//     };

//     return res.status(200).json(responseProduct);
//   } catch (error) {
//     console.error('Error in product API:', error);
//     return res.status(500).json({
//       status: 500,
//       message: 'Internal server error.',
//       error: error.message,
//     });
//   }
// }




import { connectDB } from '../../../../lib/mongodb';
import Product from '../../../../models/Product'; // کلکشن فارسی
import ProductEn from '../../../../models/ProductEn'; // کلکشن انگلیسی

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      status: 405,
      message: `Method ${req.method} not allowed.`,
    });
  }

  try {
    await connectDB();

    let { slug } = req.query;
    slug = decodeURIComponent(slug);
    const locale = req.query.locale || 'fa'; // پیش‌فرض fa

    if (!slug) {
      return res.status(400).json({
        status: 400,
        message: 'Slug is required.',
      });
    }

    let product;
    const Collection = locale === 'en' ? ProductEn : Product;

    // ابتدا توی کلکشن فعلی جستجو کن
    product = await Collection.findOne({ slug }).lean();
    if (!product) {
      // اگه پیدا نشد، با otherSlug توی کلکشن مقابل چک کن
      const OppositeCollection = locale === 'en' ? Product : ProductEn;
      const otherProduct = await OppositeCollection.findOne({ slug }).lean();
      if (otherProduct) {
        product = await Collection.findOne({ slug: otherProduct.otherSlug }).lean();
      }
    }

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found.',
      });
    }

    const otherSlug = locale === 'en' ? product.slugFa : product.slugEn; // فرض بر اینه که slugFa و slugEn استفاده می‌شه

    const responseProduct = {
      slug: product.slug,
      otherSlug,
      title: product.title,
      imgSrc: product.imgSrc,
      productId: product.productId,
      categorySlug: product.categorySlug,
      description: product.description?.map((desc) => ({
        descId: desc.descId,
        descTitle: desc.descTitle,
      })) || [],
      advices: product.advices?.map((adv) => ({
        advId: adv.advId,
        advTitle: adv.advTitle,
      })) || [],
    };

    return res.status(200).json(responseProduct);
  } catch (error) {
    console.error('Error in product API:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error.',
      error: error.message,
    });
  }
}