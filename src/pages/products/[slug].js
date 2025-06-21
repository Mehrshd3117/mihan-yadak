// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [otherSlug, setOtherSlug] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.query.slug) return;
//     const rawSlug = decodeURIComponent(router.query.slug);

//     (async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // 1) دریافت محصول جاری
//         const res1 = await fetch(
//           `/api/products/${encodeURIComponent(rawSlug)}?locale=${locale}`,
//           { cache: 'no-store' }
//         );
//         if (res1.status === 404) {
//           router.replace('/404');
//           return;
//         }
//         if (!res1.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res1.json();
//         setProduct(data);

//         // 2) دریافت لیست محصولات همین زبان (برای Related)
//         const resAll = await fetch(`/api/products?locale=${locale}`, { cache: 'no-store' });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }

//         // 3) دریافت معادل slug در زبان مقابل بر اساس productId
//         const switchLocale = locale === 'fa' ? 'en' : 'fa';
//         const resSlug = await fetch(
//           `/api/products/slug-by-id?productId=${data.productId}&locale=${switchLocale}`,
//           { cache: 'no-store' }
//         );
//         if (resSlug.ok) {
//           const { slug: slugOther } = await resSlug.json();
//           setOtherSlug(slugOther);
//         }
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [router.query.slug, locale, router, t]);

//   // Related products
//   const relatedProducts = product
//     ? allProducts
//       .filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug)
//       .slice(0, 4)
//     : [];

//   // Error state
//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg" href={{ pathname: '/products', query: { locale } }}>
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   // Loading state
//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   const switchLocale = locale === 'fa' ? 'en' : 'fa';

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={locale === 'en' ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           {/* Product Image */}
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map(desc => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map(adv => (
//                     <li key={adv.advId} className="hover:text-orange-500 dark:hover:text-orange-400 transition">
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto" href={{ pathname: '/products', query: { locale } }}>
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map(item => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={{
//                       pathname: `/products/${encodeURIComponent(item.slug)}`,
//                       query: { locale },
//                     }}
//                     passHref
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }





// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // دریافت محصول جاری
//         const res = await fetch(
//           `/api/products/${encodeURIComponent(rawSlug)}?locale=${locale}`,
//           { cache: 'no-store' }
//         );
//         if (res.status === 404) {
//           router.replace('/404');
//           return;
//         }
//         if (!res.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res.json();
//         setProduct(data);
//         setOtherSlug(data.otherSlug);

//         // دریافت محصولات مرتبط
//         const resAll = await fetch(`/api/products?locale=${locale}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         }
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, locale, router, t, setOtherSlug]);

//   const relatedProducts = product
//     ? allProducts
//         .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
//         .slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={{ pathname: '/products', query: { locale } }}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={locale === 'en' ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={{ pathname: '/products', query: { locale } }}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={{
//                       pathname: `/products/${encodeURIComponent(item.slug)}`,
//                       query: { locale },
//                     }}
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }



// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // اصلاح اینجا

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     // تشخیص زبان از مسیر
//     const isEnglish = router.asPath.includes('/en/');

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}`, {
//           cache: 'no-store',
//         });
//         if (res.status === 404) {
//           router.replace('/404');
//           return;
//         }
//         if (!res.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res.json();
//         console.log('Fetched product data:', data); // دیباگ
//         setProduct(data);
//         setOtherSlug(data.otherSlug || ''); // پیش‌فرض خالی اگه undefined بود

//         const resAll = await fetch(`/api/products`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug]);

//   const relatedProducts = product
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath.includes('/en/') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath.includes('/en/');

//     // اگر زبان انگلیسیه و اسلاگ فارسیه، اسلاگ رو به otherSlug تغییر بده
//     let finalSlug = rawSlug;
//     if (isEnglish && product?.otherSlug) {
//       finalSlug = product.otherSlug; // استفاده از otherSlug برای بار دوم
//     }

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(finalSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (res.status === 404) {
//           // اگر 404 داد، با otherSlug دوباره تلاش کن
//           if (isEnglish && product?.otherSlug && finalSlug !== product.otherSlug) {
//             const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=en`, {
//               cache: 'no-store',
//             });
//             if (fallbackRes.ok) {
//               const fallbackData = await fallbackRes.json();
//               setProduct(fallbackData);
//               setOtherSlug(fallbackData.otherSlug || '');
//               return;
//             }
//           }
//           router.replace('/404');
//           return;
//         }
//         if (!res.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res.json();
//         console.log('Fetched product data:', data); // دیباگ
//         setProduct(data);
//         setOtherSlug(data.otherSlug || ''); // به‌روزرسانی otherSlug

//         const resAll = await fetch(`/api/products?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug, product?.otherSlug]);

//   const relatedProducts = product
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath.includes('/en/') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath.includes('/en/');

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (res.status === 404) {
//           router.replace('/404');
//           return;
//         }
//         if (!res.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res.json();
//         console.log('Mehrshaddddddddddddddd:', data); // دیباگ
//         setProduct(data);
//         setOtherSlug(data.otherSlug || ''); // پیش‌فرض خالی اگه undefined بود

//         const resAll = await fetch(`/api/products?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug]);

//   const relatedProducts = product
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath.includes('/en/') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }



// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath.includes('/en/');

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (res.status === 404) {
//           // اگه 404 داد، با otherSlug دوباره تلاش کن
//           if (isEnglish && product?.otherSlug) {
//             const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=fa`, {
//               cache: 'no-store',
//             });
//             if (fallbackRes.ok) {
//               const fallbackData = await fallbackRes.json();
//               setProduct(fallbackData);
//               setOtherSlug(fallbackData.otherSlug || '');
//               return;
//             }
//           }
//           router.replace('/404');
//           return;
//         }
//         if (!res.ok) throw new Error(t('errors.product_fetch_failed'));
//         const data = await res.json();
//         console.log('Mehrshaddddddddddddddd:', data); // دیباگ
//         setProduct(data);
//         setOtherSlug(data.otherSlug || ''); // به‌روزرسانی otherSlug
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug, product?.otherSlug]);

//   const relatedProducts = product
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath.includes('/en/') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath.includes('/en');

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (!res.ok) {
//           if (product?.otherSlug) {
//             const fallbackLocale = isEnglish ? 'fa' : 'en';
//             const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=${fallbackLocale}`, {
//               cache: 'no-store',
//             });
//             if (fallbackRes.ok) {
//               const fallbackData = await fallbackRes.json();
//               setProduct(fallbackData);
//               setOtherSlug(fallbackData.otherSlug || '');
//               return;
//             }
//           }
//           throw new Error(t('errors.product_fetch_failed'));
//         }
//         const data = await res.json();
//         console.log('Mehrshaddddddddddddddd:', data);
//         setProduct(data);
//         setOtherSlug(data.otherSlug || '');

//         // لود همه محصولات
//         const resAll = await fetch(`/api/products?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug, product?.otherSlug]);

//   const relatedProducts = product && allProducts.length > 0
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     return (
//       <Layout title={t('error')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <div className="text-center text-red-500">
//             <h2 className="text-2xl font-bold">{t('errors.product_not_found')}</h2>
//             <p>{error}</p>
//             <Link
//               className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath.includes('/en/') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath.includes('/en/') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }



// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath?.includes('/en') || false; // استفاده از Optional Chaining

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (!res.ok) {
//           if (product?.otherSlug) {
//             const fallbackLocale = isEnglish ? 'fa' : 'en';
//             const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=${fallbackLocale}`, {
//               cache: 'no-store',
//             });
//             if (fallbackRes.ok) {
//               const fallbackData = await fallbackRes.json();
//               setProduct(fallbackData);
//               setOtherSlug(fallbackData.otherSlug || '');
//               return;
//             }
//           }
//           // مستقیم ریدایرکت به 404
//           router.replace('/404');
//           return;
//         }
//         const data = await res.json();
//         console.log('Mehrshaddddddddddddddd:', data);
//         setProduct(data);
//         setOtherSlug(data.otherSlug || '');

//         // لود همه محصولات
//         const resAll = await fetch(`/api/products?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         // مستقیم ریدایرکت به 404
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug, product?.otherSlug]);

//   const relatedProducts = product && allProducts.length > 0
//     ? allProducts.filter(
//         (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
//       ).slice(0, 4)
//     : [];

//   if (error) {
//     // این بخش دیگه لازم نیست چون ریدایرکت می‌کنیم
//     return null;
//   }

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath?.includes('/en') ? 'ltr' : 'rtl'} // استفاده از Optional Chaining
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath?.includes('/en') ? '/en/products' : '/products'} // استفاده از Optional Chaining
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath?.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }




// // pages/products/[slug].js
// import Link from 'next/link';
// import { HiOutlineTag } from 'react-icons/hi';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import { useLocale } from '../../../lib/localeContext';
// import { useProduct } from '../../../lib/ProductContext';

// export default function ProductDetail() {
//   const router = useRouter();
//   const { locale, t } = useLocale();
//   const { setOtherSlug } = useProduct();

//   // دیباگ برای چک کردن locale
//   useEffect(() => {
//     console.log('Current locale:', locale);
//   }, [locale]);

//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!router.isReady || !router.query.slug) return;

//     const rawSlug = decodeURIComponent(router.query.slug);
//     const isEnglish = router.asPath?.includes('/en') || false;

//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (!res.ok) {
//           if (product?.otherSlug) {
//             const fallbackLocale = isEnglish ? 'fa' : 'en';
//             const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=${fallbackLocale}`, {
//               cache: 'no-store',
//             });
//             if (fallbackRes.ok) {
//               const fallbackData = await fallbackRes.json();
//               setProduct(fallbackData);
//               setOtherSlug(fallbackData.otherSlug || '');
//               return;
//             }
//           }
//           router.replace('/404');
//           return;
//         }
//         const data = await res.json();
//         console.log('Mehrshaddddddddddddddd:', data);
//         setProduct(data);
//         setOtherSlug(data.otherSlug || '');

//         const resAll = await fetch(`/api/products?locale=${isEnglish ? 'en' : 'fa'}`, {
//           cache: 'no-store',
//         });
//         if (resAll.ok) {
//           const list = await resAll.json();
//           setAllProducts(list);
//         } else {
//           console.error(t('errors.related_products_fetch_failed'));
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         router.replace('/404');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [router.isReady, router.query.slug, router.asPath, t, setOtherSlug, product?.otherSlug]);

//   const relatedProducts = product && allProducts.length > 0
//     ? allProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4)
//     : [];

//   if (loading || !product) {
//     return (
//       <Layout title={t('loading')} content="">
//         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//           <Skeleton variant="rectangular" width={300} height={300} />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`${t('product')} ${product.title}`} content={t('product_details')}>
//       <div
//         className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//         dir={router.asPath?.includes('/en') ? 'ltr' : 'rtl'}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//         >
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                 <img
//                   src={product.imgSrc}
//                   alt={product.title}
//                   className="max-h-full object-contain"
//                   onError={(e) => console.log('Image load error:', e)}
//                   draggable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-slate-900 dark:text-slate-200 space-y-6">
//             <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//               {product.title}
//             </h1>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
//               <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code')}:
//                 <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//             </motion.div>

//             {product.description.map((desc) => (
//               <div
//                 key={desc.descId}
//                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//               >
//                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                   {desc.descTitle}
//                 </p>
//               </div>
//             ))}

//             {product.advices.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                   {t('advices')}
//                 </h2>
//                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                   {product.advices.map((adv) => (
//                     <li
//                       key={adv.advId}
//                       className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                     >
//                       {adv.advTitle}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <Link
//               className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//               href={router.asPath?.includes('/en') ? '/en/products' : '/products'}
//             >
//               {t('back_to_products')}
//             </Link>
//           </div>
//         </motion.div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//             <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//               {t('related_products')}
//             </h3>
//             <Swiper
//               spaceBetween={20}
//               slidesPerView={1.4}
//               breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
//               navigation
//               modules={[Navigation]}
//               className="pb-6"
//             >
//               {relatedProducts.map((item) => (
//                 <SwiperSlide key={item.productId}>
//                   <Link
//                     className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                     href={
//                       router.asPath?.includes('/en/')
//                         ? `/en/products/${encodeURIComponent(item.slug)}`
//                         : `/products/${encodeURIComponent(item.slug)}`
//                     }
//                   >
//                     <img
//                       src={item.imgSrc}
//                       alt={item.title}
//                       className="h-52 w-full object-cover"
//                       onError={(e) => console.log('Related image error:', e)}
//                       draggable={false}
//                     />
//                     <div className="p-4">
//                       <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                         {item.title}
//                       </h4>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }



// pages/products/[slug].js
import Link from 'next/link';
import { HiOutlineTag } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Skeleton from '@mui/material/Skeleton';
import Layout from '../../components/Layout';
import { t, getTranslations } from '../../../lib/translation'; // اضافه کردن تابع t
import { useProduct } from '../../../lib/ProductContext';

export default function ProductDetail() {
  const router = useRouter();
  const { setOtherSlug } = useProduct();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تشخیص زبان بر اساس مسیر
  const isEnglish = router.asPath?.includes('/en') || false;
  const locale = isEnglish ? 'en' : 'fa';

  useEffect(() => {
    if (!router.isReady || !router.query.slug) return;

    const rawSlug = decodeURIComponent(router.query.slug);

    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${locale}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          if (product?.otherSlug) {
            const fallbackLocale = isEnglish ? 'fa' : 'en';
            const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=${fallbackLocale}`, {
              cache: 'no-store',
            });
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              setProduct(fallbackData);
              setOtherSlug(fallbackData.otherSlug || '');
              return;
            }
          }
          router.replace('/404');
          return;
        }
        const data = await res.json();
        console.log('Mehrshaddddddddddddddd:', data);
        setProduct(data);
        setOtherSlug(data.otherSlug || '');

        const resAll = await fetch(`/api/products?locale=${locale}`, {
          cache: 'no-store',
        });
        if (resAll.ok) {
          const list = await resAll.json();
          setAllProducts(list);
        } else {
          console.error(t('errors:related_products_fetch_failed', locale));
        }
      } catch (err) {
        console.error('Fetch error:', err);
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [router.isReady, router.query.slug, router.asPath, locale, setOtherSlug, product?.otherSlug]);

  const relatedProducts = product && allProducts.length > 0
    ? allProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4)
    : [];

  if (loading || !product) {
    return (
      <Layout title={t('loading', locale)} content="">
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
          <Skeleton variant="rectangular" width={300} height={300} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${t('product', locale)} ${product.title}`} content={t('product_details', locale)}>
      <div
        className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
        dir={router.asPath?.includes('/en') ? 'ltr' : 'rtl'}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="max-h-full object-contain"
                  onError={(e) => console.log('Image load error:', e)}
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="text-slate-900 dark:text-slate-200 space-y-6">
            <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
              {product.title}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
            >
              <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5" />
              <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
                {t('product_code', locale)}:
                <span className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
                  {product.productId}
                </span>
              </span>
            </motion.div>

            {product.description.map((desc) => (
              <div
                key={desc.descId}
                className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
              >
                <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
                  {desc.descTitle}
                </p>
              </div>
            ))}

            {product.advices.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
                  {t('advices', locale)}
                </h2>
                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
                  {product.advices.map((adv) => (
                    <li
                      key={adv.advId}
                      className="hover:text-orange-500 dark:hover:text-orange-400 transition"
                    >
                      {adv.advTitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
              href={router.asPath?.includes('/en') ? '/en/products' : '/products'}
            >
              {t('back_to_products', locale)}
            </Link>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
            <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
              {t('related_products', locale)}
            </h3>
            <Swiper
              spaceBetween={20}
              slidesPerView={1.4}
              breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
              navigation
              modules={[Navigation]}
              className="pb-6"
            >
              {relatedProducts.map((item) => (
                <SwiperSlide key={item.productId}>
                  <Link
                    className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    href={
                      router.asPath?.includes('/en/')
                        ? `/en/products/${encodeURIComponent(item.slug)}`
                        : `/products/${encodeURIComponent(item.slug)}`
                    }
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="h-52 w-full object-cover"
                      onError={(e) => console.log('Related image error:', e)}
                      draggable={false}
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </Layout>
  );
}