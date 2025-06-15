// pages/products/[slug].js


import {HiOutlineTag} from "react-icons/hi";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Layout from "../../components/Layout";

export default function ProductDetail() {
    const router = useRouter();
    const {slug} = router.query;

    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch product details
                const res = await fetch(`/api/products/${slug}`);
                if (res.status === 404) {
                    // Redirect to Next.js 404 page
                    router.replace('/404');
                    return;
                }
                if (!res.ok) {
                    router.replace('/404');
                    return;
                }
                const data = await res.json();
                setProduct(data);

                // Fetch all products for related section
                const allRes = await fetch("/data/products.json");
                if (allRes.ok) {
                    const all = await allRes.json();
                    setAllProducts(all);
                } else {
                    console.error("خطا در بارگذاری لیست محصولات مرتبط");
                }
            } catch (err) {
                console.error("Error:", err);
                router.replace('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, router]);

    // Compute related products only when product is loaded
    const relatedProducts = product
        ? allProducts
            .filter(
                (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
            )
            .slice(0, 4)
        : [];

    // Show loading skeleton until data is ready or redirect happens
    if (loading || !product) {
        return (
            <Layout title="در حال بارگذاری..." content="">
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                    <Skeleton variant="rectangular" width={300} height={300}/>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`محصول ${product.title}`} content="جزئیات محصول">
            <div className="min-h-screen bg-white dark:bg-slate-900 py-32 px-4 sm:px-8 lg:px-16" dir="rtl">
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
                >
                    {/* تصویر محصول */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div
                                className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-xl flex justify-center items-center h-[500px]">
                                {loading ? (
                                    <Skeleton variant="rectangular" width="100%" height="100%"/>
                                ) : (
                                    <img
                                        src={product.imgSrc}
                                        alt={product.title}
                                        className="max-h-full object-contain"
                                        draggable={false}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* توضیحات محصول */}
                    <div className="text-slate-900 dark:text-slate-200 space-y-6">
                        {/* عنوان */}
                        {loading ? (
                            <Skeleton variant="text" width="60%" height={40}/>
                        ) : (
                            <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                                {product.title}
                            </h1>
                        )}

                        {/* کد محصول */}
                        {loading ? (
                            <Skeleton variant="rounded" width="40%" height={30}/>
                        ) : (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-400 dark:bg-orange-500 border border-orange-300 dark:border-orange-700 shadow-sm hover:shadow-md transition-all"
                            >
                                <HiOutlineTag className="text-teal-600 dark:text-orange-200 w-5 h-5"/>
                                <span className="text-sm font-semibold text-orange-800 dark:text-orange-100">
                  کد محصول:
                  <span
                      className="ml-2 font-mono bg-orange-400 dark:bg-orange-500 text-dark dark:text-white px-2 py-0.5 rounded">
                    {product.productId}
                  </span>
                </span>
                            </motion.div>
                        )}

                        {/* توضیحات */}
                        {loading
                            ? [...Array(3)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    variant="rounded"
                                    height={60}
                                    className="rounded-xl border border-slate-200 dark:border-slate-700 mb-4"
                                />
                            ))
                            : product.description?.map((desc) => (
                                <div
                                    key={desc.descId}
                                    className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300 mb-4"
                                >
                                    <p className="text-base text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
                                        {desc.descTitle}
                                    </p>
                                </div>
                            ))}

                        {/* توصیه‌ها */}
                        {!loading && product.advices?.length > 0 && (
                            <div className="mt-6">
                                <h2 className="font-semibold text-orange-700 dark:text-orange-600 mb-3">
                                    توصیه‌ها:
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

                        {!loading && (
                            <Link
                                href="/products"
                                className="inline-block mt-8 text-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
                            >
                                بازگشت به لیست محصولات
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* محصولات مرتبط */}
                {!loading && relatedProducts.length > 0 && (
                    <div className="mt-20 max-w-7xl mx-auto px-2 text-slate-900 dark:text-slate-200">
                        <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
                            محصولات مرتبط
                        </h3>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1.4}
                            breakpoints={{
                                640: {slidesPerView: 2.2},
                                1024: {slidesPerView: 3.2},
                            }}
                            navigation
                            modules={[Navigation]}
                            className="pb-6"
                        >
                            {relatedProducts.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <Link
                                        href={`/products/${item.slug}`}
                                        className="block bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                    >
                                        <img
                                            src={item.imgSrc}
                                            alt={item.title}
                                            className="h-52 w-full object-cover"
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


