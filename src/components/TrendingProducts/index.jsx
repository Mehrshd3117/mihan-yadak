// import { useRouter } from "next/router";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import {
//   LuShieldCheck,
//   LuTruck,
//   LuChevronLeft,
//   LuChevronRight,
// } from "react-icons/lu";
//
// const TrendingProducts = ({ slides }) => {
//   const router = useRouter();
//
//   return (
//     <div className="min-h-screen p-5 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col items-center justify-center py-16 px-4">
//       <div className="w-full max-w-7xl mx-auto mb-12 text-center">
//         <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-800 bg-clip-text text-transparent dark:from-orange-400 dark:to-yellow-500 font-vazir">
//           محصولات پرفروش
//         </h2>
//       </div>
//
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl px-4 mb-16">
//         <section
//           aria-label="تضمین کیفیت"
//           className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//         >
//           <div className="absolute -top-8 -right-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
//           <LuShieldCheck
//             className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
//             aria-hidden="true"
//           />
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//             تضمین کیفیت
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//             تمامی محصولات ما با کنترل کیفیت دقیق تولید می‌شوند و دارای
//             استانداردهای بالا هستند.
//           </p>
//         </section>
//
//         <section
//           aria-label="ضمانت اصالت کالا"
//           className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//         >
//           <div className="absolute -bottom-8 -left-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
//           <LuTruck
//             className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
//             aria-hidden="true"
//           />
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//             بسته بندی درجه یک و حرفه ای
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//             سفارشات شما در بهترین حالت ممکن بسته بندی میشوند.
//           </p>
//         </section>
//       </div>
//
//       <div className="w-full max-w-7xl relative px-4 py-5">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           pagination={{
//             clickable: true,
//             dynamicBullets: true,
//             el: ".custom-pagination",
//             renderBullet: (index, className) =>
//               `<span class="${className} bg-orange-500 opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`,
//           }}
//           navigation={{
//             nextEl: ".custom-next",
//             prevEl: ".custom-prev",
//           }}
//           modules={[Pagination, Navigation, Autoplay]}
//           breakpoints={{
//             640: { slidesPerView: 1, spaceBetween: 20 },
//             768: { slidesPerView: 2, spaceBetween: 25 },
//             1024: { slidesPerView: 2, spaceBetween: 30 },
//             1280: { slidesPerView: 3, spaceBetween: 30 },
//           }}
//           className="pb-12"
//           // prevent unnecessary re-renders
//           key={slides?.length}
//         >
//           {slides?.map((slide, index) => (
//             <SwiperSlide key={slide.slug} className="h-full">
//               <article className="relative group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-500 hover:shadow-xl hover:border-orange-500 overflow-hidden mx-auto w-full max-w-sm h-full flex flex-col">
//                 <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300 z-10">
//                   پرفروش
//                 </div>
//
//                 <div className="absolute z-0 -top-8 -right-8 bg-orange-500 w-24 h-24 rounded-full opacity-20 group-hover:scale-150 group-hover:opacity-30 transition-all duration-700" />
//
//                 <div className="relative pt-[70%] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-700/50 mb-4">
//                   <Image
//                     src={slide.imgSrc}
//                     alt={slide.title}
//                     fill
//                     sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
//                     className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//                     priority={index === 0} // فقط اولین اسلاید priority بگیره
//                   />
//                 </div>
//
//                 <div className="p-4 pt-0 text-center">
//                   <h3 className="text-lg font-bold text-gray-800 dark:text-white font-vazir group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-snug min-h-[3.5rem]">
//                     {slide.title}
//                   </h3>
//                 </div>
//
//                 <div className="px-4 pb-4 mt-auto">
//                   <div className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/30 shadow-sm group-hover:shadow-md group-hover:border-orange-400 transition-all duration-300 text-center">
//                     <button
//                       className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-300"
//                       onClick={() => router.push(`/products/${slide.slug}`)}
//                       aria-label={`مشاهده جزئیات ${slide.title}`}
//                     >
//                       مشاهده جزئیات
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//
//         <div className="custom-pagination flex justify-center gap-2 mt-6 !bottom-0" />
//
//         <button
//           className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hidden md:flex"
//           aria-label="Previous slide"
//         >
//           <LuChevronLeft className="h-5 w-5" />
//         </button>
//
//         <button
//           className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hidden md:flex"
//           aria-label="Next slide"
//         >
//           <LuChevronRight className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default TrendingProducts;
//
//
//
//
//
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import {
//   LuShieldCheck,
//   LuTruck,
//   LuChevronLeft,
//   LuChevronRight,
// } from "react-icons/lu";
// import { useLocale } from "../../../lib/localeContext"; // ← هوک کمکی
//
// const TrendingProducts = ({ slides }) => {
//   const router = useRouter();
//   const { t } = useLocale();  // ← اینجا t رو می‌گیری
//
//   return (
//     <div className="min-h-screen p-5 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col items-center justify-center py-16 px-4">
//       <div className="w-full max-w-7xl mx-auto mb-12 text-center">
//         <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-800 bg-clip-text text-transparent dark:from-orange-400 dark:to-yellow-500 font-vazir">
//           {t("trendingProducts.title")}
//         </h2>
//       </div>
//
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl px-4 mb-16">
//         <section
//           aria-label={t("trendingProducts.qualityGuarantee.title")}
//           className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//         >
//           <div className="absolute -top-8 -right-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
//           <LuShieldCheck
//             className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
//             aria-hidden="true"
//           />
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//             {t("trendingProducts.qualityGuarantee.title")}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//             {t("trendingProducts.qualityGuarantee.description")}
//           </p>
//         </section>
//
//         <section
//           aria-label={t("trendingProducts.packaging.title")}
//           className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//         >
//           <div className="absolute -bottom-8 -left-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
//           <LuTruck
//             className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
//             aria-hidden="true"
//           />
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//             {t("trendingProducts.packaging.title")}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//             {t("trendingProducts.packaging.description")}
//           </p>
//         </section>
//       </div>
//
//       <div className="w-full max-w-7xl relative px-4 py-5">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={30}
//           loop
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           pagination={{
//             clickable: true,
//             dynamicBullets: true,
//             el: ".custom-pagination",
//             renderBullet: (i, className) =>
//               `<span class="${className} bg-orange-500 opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`,
//           }}
//           navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
//           modules={[Pagination, Navigation, Autoplay]}
//           breakpoints={{
//             640: { slidesPerView: 1, spaceBetween: 20 },
//             768: { slidesPerView: 2, spaceBetween: 25 },
//             1024: { slidesPerView: 2, spaceBetween: 30 },
//             1280: { slidesPerView: 3, spaceBetween: 30 },
//           }}
//           className="pb-12"
//           key={slides?.length}
//         >
//           {slides?.map((slide, idx) => (
//             <SwiperSlide key={slide.slug} className="h-full">
//               <article className="relative group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-500 hover:shadow-xl hover:border-orange-500 overflow-hidden mx-auto w-full max-w-sm h-full flex flex-col">
//                 <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300 z-10">
//                   {t("trendingProducts.badge.bestSeller")}
//                 </div>
//                 <div className="absolute z-0 -top-8 -right-8 bg-orange-500 w-24 h-24 rounded-full opacity-20 group-hover:scale-150 group-hover:opacity-30 transition-all duration-700" />
//
//                 <div className="relative pt-[70%] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-700/50 mb-4">
//                   <Image
//                     src={slide.imgSrc}
//                     alt={t(slide.titleKey)}
//                     fill
//                     sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
//                     className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//                     priority={idx === 0}
//                   />
//                 </div>
//
//                 <div className="p-4 pt-0 text-center">
//                   <h3 className="text-lg font-bold text-gray-800 dark:text-white font-vazir group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-snug min-h-[3.5rem]">
//                     {t(slide.titleKey)}
//                   </h3>
//                 </div>
//
//                 <div className="px-4 pb-4 mt-auto">
//                   <div className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/30 shadow-sm group-hover:shadow-md group-hover:border-orange-400 transition-all duration-300 text-center">
//                     <button
//                       className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-300"
//                       onClick={() => router.push(`/products/${slide.slug}`)}
//                       aria-label={t("trendingProducts.detailsButtonAria", {
//                         title: t(slide.titleKey),
//                       })}
//                     >
//                       {t("trendingProducts.detailsButton")}
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//
//         <div className="custom-pagination flex justify-center gap-2 mt-6 !bottom-0" />
//
//         <button
//           className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hidden md:flex"
//           aria-label="Previous slide"
//         >
//           <LuChevronLeft className="h-5 w-5" />
//         </button>
//
//         <button
//           className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hidden md:flex"
//           aria-label="Next slide"
//         >
//           <LuChevronRight className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default TrendingProducts;
//


// // ── /src/components/TrendingProducts/index.jsx ──
// import {useRouter} from "next/router";
// import Image from "next/image";
// import {Swiper, SwiperSlide} from "swiper/react";
// import {Pagination, Navigation, Autoplay} from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import {
//     LuShieldCheck,
//     LuTruck,
//     LuChevronLeft,
//     LuChevronRight,
// } from "react-icons/lu";
// import {useLocale} from "../../../lib/localeContext";

// const TrendingProducts = ({slides = []}) => {
//     const router = useRouter();
//     const {t} = useLocale();

//     return (
//         <div
//             className="min-h-screen p-5 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col items-center justify-center py-16 px-4">
//             {/* عنوان */}
//             <div className="w-full max-w-7xl mx-auto mb-12 text-center">
//                 <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-800 bg-clip-text text-transparent dark:from-orange-400 dark:to-yellow-500 font-vazir">
//                     {t("trendingProducts.title")}
//                 </h2>
//             </div>

//             {/* کارت تضمین و بسته‌بندی */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl px-4 mb-16">
//                 <section
//                     aria-label={t("trendingProducts.qualityGuarantee.title")}
//                     className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//                 >
//                     <div
//                         className="absolute -top-8 -right-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"/>
//                     <LuShieldCheck
//                         className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
//                         aria-hidden="true"
//                     />
//                     <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                         {t("trendingProducts.qualityGuarantee.title")}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                         {t("trendingProducts.qualityGuarantee.description")}
//                     </p>
//                 </section>

//                 <section
//                     aria-label={t("trendingProducts.packaging.title")}
//                     className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
//                 >
//                     <div
//                         className="absolute -bottom-8 -left-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"/>
//                     <LuTruck
//                         className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
//                         aria-hidden="true"
//                     />
//                     <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                         {t("trendingProducts.packaging.title")}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                         {t("trendingProducts.packaging.description")}
//                     </p>
//                 </section>
//             </div>

//             {/* اسلایدر */}
//             <div className="w-full max-w-7xl relative px-4 py-5">
//                 <Swiper
//                     slidesPerView={1}
//                     spaceBetween={30}
//                     loop
//                     autoplay={{
//                         delay: 3000,
//                         disableOnInteraction: false,
//                         pauseOnMouseEnter: true,
//                     }}
//                     pagination={{
//                         clickable: true,
//                         dynamicBullets: true,
//                         el: ".custom-pagination",
//                         renderBullet: (i, className) =>
//                             `<span class="${className} bg-orange-500 opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`,
//                     }}
//                     navigation={{nextEl: ".custom-next", prevEl: ".custom-prev"}}
//                     modules={[Pagination, Navigation, Autoplay]}
//                     breakpoints={{
//                         640: {slidesPerView: 1, spaceBetween: 20},
//                         768: {slidesPerView: 2, spaceBetween: 25},
//                         1024: {slidesPerView: 2, spaceBetween: 30},
//                         1280: {slidesPerView: 3, spaceBetween: 30},
//                     }}
//                     className="pb-12"
//                     key={slides.length}
//                 >
//                     {slides.map((slide, idx) => (
//                         <SwiperSlide key={slide.slug || idx} className="h-full">
//                             <article
//                                 className="relative group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-500 hover:shadow-xl hover:border-orange-500 overflow-hidden mx-auto w-full max-w-sm h-full flex flex-col">
//                                 {/* نشانک پرفروش */}
//                                 <div
//                                     className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transition-all duration-300 z-10">
//                                     {t("trendingProducts.badge.bestSeller")}
//                                 </div>

//                                 {/* دایره‌ی تزئینی */}
//                                 <div
//                                     className="absolute z-0 -top-8 -right-8 bg-orange-500 w-24 h-24 rounded-full opacity-20 transition-all duration-700"/>

//                                 {/* تصویر */}
//                                 <div
//                                     className="relative pt-[70%] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-700/50 mb-4">
//                                     <Image
//                                         src={slide.imgSrc}
//                                         alt={t(slide.titleKey)}
//                                         fill
//                                         sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
//                                         className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//                                         priority={idx === 0}
//                                     />
//                                 </div>

//                                 {/* عنوان */}
//                                 <div className="p-4 pt-0 text-center">
//                                     <h3 className="text-lg font-bold text-gray-800 dark:text-white font-vazir transition-colors duration-300 line-clamp-2 leading-snug min-h-[3.5rem]">
//                                         {t(slide.titleKey)}
//                                     </h3>
//                                 </div>

//                                 {/* دکمه */}
//                                 <div className="px-4 pb-4 mt-auto">
//                                     <div
//                                         className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/30 shadow-sm transition-all duration-300 text-center">
//                                         <button
//                                             className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-300"
//                                             onClick={() =>
//                                                 slide.slug && router.push(`/products/${slide.slug}`)
//                                             }
//                                             aria-label={t("trendingProducts.detailsButtonAria", {
//                                                 title: t(slide.titleKey),
//                                             })}
//                                         >
//                                             {t("trendingProducts.detailsButton")}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </article>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* pagination و ناوبری */}
//                 <div className="custom-pagination flex justify-center gap-2 mt-6"/>
//                 <button className="custom-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 ...">
//                     <LuChevronLeft className="h-5 w-5"/>
//                 </button>
//                 <button className="custom-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 ...">
//                     <LuChevronRight className="h-5 w-5"/>
//                 </button>
//             </div>
//         </div>
//     );
// };
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { LuShieldCheck, LuTruck, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useLocale } from '../../../lib/localeContext';
import { useEffect, useState } from 'react';

const TrendingProducts = () => {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await fetch(`/api/products?locale=${locale}&isTrending=true`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch trending products');
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };
    fetchTrendingProducts();
  }, [locale]);

  return (
    <div
      className="min-h-screen p-5 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col items-center justify-center py-16 px-4"
    >
      {/* عنوان */}
      <div className="w-full max-w-7xl mx-auto mb-12 text-center">
        <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-800 bg-clip-text text-transparent dark:from-orange-400 dark:to-yellow-500 font-vazir">
          {t('trendingProducts.title')}
        </h2>
      </div>

      {/* کارت تضمین و بسته‌بندی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl px-4 mb-16">
        <section
          aria-label={t('trendingProducts.qualityGuarantee.title')}
          className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
          <LuShieldCheck
            className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {t('trendingProducts.qualityGuarantee.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {t('trendingProducts.qualityGuarantee.description')}
          </p>
        </section>

        <section
          aria-label={t('trendingProducts.packaging.title')}
          className="relative group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:border-orange-500 overflow-hidden"
        >
          <div className="absolute -bottom-8 -left-8 bg-orange-500 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
          <LuTruck
            className="text-5xl text-orange-500 mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {t('trendingProducts.packaging.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {t('trendingProducts.packaging.description')}
          </p>
        </section>
      </div>

      {/* اسلایدر */}
      <div className="w-full max-w-7xl relative px-4 py-5">
        {slides.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: '.custom-pagination',
              renderBullet: (i, className) =>
                `<span class="${className} bg-orange-500 opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`,
            }}
            navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-12"
            key={slides.length}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={slide.slug || idx} className="h-full">
                <article className="relative group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-500 hover:shadow-xl hover:border-orange-500 overflow-hidden mx-auto w-full max-w-sm h-full flex flex-col">
                  {/* نشانک پرفروش */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transition-all duration-300 z-10">
                    {t('trendingProducts.badge.bestSeller')}
                  </div>

                  {/* دایره‌ی تزئینی */}
                  <div className="absolute z-0 -top-8 -right-8 bg-orange-500 w-24 h-24 rounded-full opacity-20 transition-all duration-700" />

                  {/* تصویر */}
                  <div className="relative pt-[70%] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-700/50 mb-4">
                    <Image
                      src={slide.imgSrc}
                      alt={slide.title}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      priority={idx === 0}
                    />
                  </div>

                  {/* عنوان */}
                  <div className="p-4 pt-0 text-center">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white font-vazir transition-colors duration-300 line-clamp-2 leading-snug min-h-[3.5rem]">
                      {slide.title}
                    </h3>
                  </div>

                  {/* دکمه */}
                  <div className="px-4 pb-4 mt-auto">
                    <div className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/30 shadow-sm transition-all duration-300 text-center">
                      <button
                        className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-300"
                        onClick={() =>
                          slide.slug && router.push(`/products/${slide.slug}`)
                        }
                        aria-label={t('trendingProducts.detailsButtonAria', {
                          title: slide.title,
                        })}
                      >
                        {t('trendingProducts.detailsButton')}
                      </button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            {t('trendingProducts.noProducts')}
          </div>
        )}

        {/* pagination و ناوبری */}
        <div className="custom-pagination flex justify-center gap-2 mt-6" />
        <button className="custom-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300 z-10">
          <LuChevronLeft className="h-5 w-5" />
        </button>
        <button className="custom-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300 z-10">
          <LuChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;