// // pages/products/[slug].js
// import Link from 'next/link';
// import {HiOutlineTag} from 'react-icons/hi';
// import {useRouter} from 'next/router';
// import {useEffect, useState} from 'react';
// import {motion} from 'framer-motion';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import {Navigation} from 'swiper/modules';
// import Skeleton from '@mui/material/Skeleton';
// import Layout from '../../components/Layout';
// import {t, getTranslations} from '../../../lib/translation'; // اضافه کردن تابع t
// import {useProduct} from '../../../lib/ProductContext';
//
// export default function ProductDetail() {
//     const router = useRouter();
//     const {setOtherSlug} = useProduct();
//     const [product, setProduct] = useState(null);
//     const [allProducts, setAllProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     // تشخیص زبان بر اساس مسیر
//     const isEnglish = router.asPath?.includes('/en') || false;
//     const locale = isEnglish ? 'en' : 'fa';
//
//     useEffect(() => {
//         if (!router.isReady || !router.query.slug) return;
//
//         const rawSlug = decodeURIComponent(router.query.slug);
//
//         const fetchProductData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const res = await fetch(`/api/products/${encodeURIComponent(rawSlug)}?locale=${locale}`, {
//                     cache: 'no-store',
//                 });
//                 if (!res.ok) {
//                     if (product?.otherSlug) {
//                         const fallbackLocale = isEnglish ? 'fa' : 'en';
//                         const fallbackRes = await fetch(`/api/products/${encodeURIComponent(product.otherSlug)}?locale=${fallbackLocale}`, {
//                             cache: 'no-store',
//                         });
//                         if (fallbackRes.ok) {
//                             const fallbackData = await fallbackRes.json();
//                             setProduct(fallbackData);
//                             setOtherSlug(fallbackData.otherSlug || '');
//                             return;
//                         }
//                     }
//                     router.replace('/404');
//                     return;
//                 }
//                 const data = await res.json();
//                 console.log('Mehrshaddddddddddddddd:', data);
//                 setProduct(data);
//                 setOtherSlug(data.otherSlug || '');
//
//                 const resAll = await fetch(`/api/products?locale=${locale}`, {
//                     cache: 'no-store',
//                 });
//                 if (resAll.ok) {
//                     const list = await resAll.json();
//                     setAllProducts(list);
//                 } else {
//                     console.error(t('errors:related_products_fetch_failed', locale));
//                 }
//             } catch (err) {
//                 console.error('Fetch error:', err);
//                 router.replace('/404');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchProductData();
//     }, [router.isReady, router.query.slug, router.asPath, locale, setOtherSlug, product?.otherSlug]);
//
//     const relatedProducts = product && allProducts.length > 0
//         ? allProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4)
//         : [];
//
//     if (loading || !product) {
//         return (
//             <Layout title={t('loading', locale)} content="">
//                 <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//                     <Skeleton variant="rectangular" width={300} height={300}/>
//                 </div>
//             </Layout>
//         );
//     }
//
//     return (
//         <Layout title={`${t('product', locale)} ${product.title}`} content={t('product_details', locale)}>
//             <div
//                 className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16"
//                 dir={router.asPath?.includes('/en') ? 'ltr' : 'rtl'}
//             >
//                 <motion.div
//                     initial={{opacity: 0, y: 40}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
//                 >
//                     <div className="relative">
//                         <div className="sticky top-24">
//                             <div
//                                 className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
//                                 <img
//                                     src={product.imgSrc}
//                                     alt={product.title}
//                                     className="max-h-full object-contain"
//                                     onError={(e) => console.log('Image load error:', e)}
//                                     draggable={false}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="text-slate-900 dark:text-slate-200 space-y-6">
//                         <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
//                             {product.title}
//                         </h1>
//                         <motion.div
//                             initial={{opacity: 0, y: 10}}
//                             animate={{opacity: 1, y: 0}}
//                             transition={{duration: 0.5}}
//                             className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
//                         >
//                             <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5"/>
//                             <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
//                 {t('product_code', locale)}:
//                 <span
//                     className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
//                   {product.productId}
//                 </span>
//               </span>
//                         </motion.div>
//
//                         {product.description.map((desc) => (
//                             <div
//                                 key={desc.descId}
//                                 className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
//                             >
//                                 <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
//                                     {desc.descTitle}
//                                 </p>
//                             </div>
//                         ))}
//
//                         {product.advices.length > 0 && (
//                             <div className="mt-6">
//                                 <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
//                                     {t('advices', locale)}
//                                 </h2>
//                                 <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
//                                     {product.advices.map((adv) => (
//                                         <li
//                                             key={adv.advId}
//                                             className="hover:text-orange-500 dark:hover:text-orange-400 transition"
//                                         >
//                                             {adv.advTitle}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//
//                         <Link
//                             className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
//                             href={router.asPath?.includes('/en') ? '/en/products' : '/products'}
//                         >
//                             {t('back_to_products', locale)}
//                         </Link>
//                     </div>
//                 </motion.div>
//
//                 {relatedProducts.length > 0 && (
//                     <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
//                         <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//                             {t('related_products', locale)}
//                         </h3>
//                         <Swiper
//                             spaceBetween={20}
//                             slidesPerView={1.4}
//                             breakpoints={{640: {slidesPerView: 2.2}, 1024: {slidesPerView: 3.2}}}
//                             navigation
//                             modules={[Navigation]}
//                             className="pb-6"
//                         >
//                             {relatedProducts.map((item) => (
//                                 <SwiperSlide key={item.productId}>
//                                     <Link
//                                         className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
//                                         href={
//                                             router.asPath?.includes('/en/')
//                                                 ? `/en/products/${encodeURIComponent(item.slug)}`
//                                                 : `/products/${encodeURIComponent(item.slug)}`
//                                         }
//                                     >
//                                         <img
//                                             src={item.imgSrc}
//                                             alt={item.title}
//                                             className="h-52 w-full object-cover"
//                                             onError={(e) => console.log('Related image error:', e)}
//                                             draggable={false}
//                                         />
//                                         <div className="p-4">
//                                             <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                                                 {item.title}
//                                             </h4>
//                                         </div>
//                                     </Link>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// }
//



// pages/products/[slug].js
import Link from 'next/link';
import { HiOutlineTag } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Skeleton from '@mui/material/Skeleton';
import Layout from '../../components/Layout';
import { t } from '../../../lib/translation';
import { useProduct } from '../../../lib/ProductContext';

export default function ProductDetail() {
  const router = useRouter();
  const { setOtherSlug } = useProduct();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تشخیص زبان
  const isEnglish = router.asPath?.includes('/en');
  const locale = isEnglish ? 'en' : 'fa';

  // واکشی داده‌ها
  useEffect(() => {
    if (!router.isReady || !router.query.slug) return;
    const rawSlug = decodeURIComponent(router.query.slug);

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/${encodeURIComponent(rawSlug)}?locale=${locale}`,
          { cache: 'no-store' }
        );
        if (!res.ok) {
          router.replace('/404');
          return;
        }
        const data = await res.json();
        setProduct(data);
        setOtherSlug(data.otherSlug || '');

        const resAll = await fetch(`/api/products?locale=${locale}`, {
          cache: 'no-store',
        });
        if (resAll.ok) {
          setAllProducts(await resAll.json());
        }
      } catch {
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, router.query.slug, router.asPath, locale, setOtherSlug]);

  // فیلتر محصولات مرتبط
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug)
      .slice(0, 4);
  }, [allProducts, product]);

  // نمایش اسکلتون هنگام لود
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
        dir={isEnglish ? 'ltr' : 'rtl'}
      >
        {/* بخش اصلی جزئیات محصول */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {/* تصویر محصول */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="max-h-full object-contain"
                  onError={e => console.log('Image load error:', e)}
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* اطلاعات محصول */}
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

            {product.description.map(desc => (
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
                  {product.advices.map(adv => (
                    <li key={adv.advId} className="hover:text-orange-500 dark:hover:text-orange-400 transition">
                      {adv.advTitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={isEnglish ? '/en/products' : '/products'}
              className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
            >
              {t('back_to_products', locale)}
            </Link>
          </div>
        </motion.div>

        {/* اسلایدر محصولات مرتبط */}
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
              {relatedProducts.map(item => (
                <SwiperSlide key={item.productId} className="h-[360px]">
                  <Link
                    href={
                      isEnglish
                        ? `/en/products/${encodeURIComponent(item.slug)}`
                        : `/products/${encodeURIComponent(item.slug)}`
                    }
                    className="block h-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    {/* عکس با ارتفاع ثابت */}
                    <div className="h-48 w-full flex-shrink-0 overflow-hidden">
                      <img
                        src={item.imgSrc}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                    {/* عنوان با ارتفاع ثابت */}
                    <div className="p-4 h-12 overflow-hidden flex items-center justify-center text-center">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
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
