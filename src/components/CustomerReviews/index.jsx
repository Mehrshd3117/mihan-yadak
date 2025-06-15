// import React, { memo } from "react";
// import dynamic from "next/dynamic";
//
// const FaQuoteLeft = dynamic(() =>
//   import("react-icons/fa").then((mod) => mod.FaQuoteLeft)
// );
// const FaUser = dynamic(() =>
//   import("react-icons/fa").then((mod) => mod.FaUser)
// );
// const FaStar = dynamic(() =>
//   import("react-icons/fa").then((mod) => mod.FaStar)
// );
//
// const reviews = [
//   {
//     id: 1,
//     name: "علی محمدی",
//     position: "مدیر فنی - شرکت صنایع الکترونیک",
//     comment:
//       "کیفیت محصولات بسیار عالی بود. تیم پشتیبانی 24 ساعته پاسخگوی سوالات فنی ما بودند و در انتخاب بهترین محصول راهنمایی کامل ارائه دادند.",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "فاطمه رضایی",
//     position: "مدیر خرید - فروشگاه تجهیزات صنعتی",
//     comment:
//       "تحویل سریع و بسته‌بندی حرفه‌ای داشتند. محصولات بعد از 6 ماه استفاده هیچ مشکلی نداشتند و واقعا از خرید راضی هستیم.",
//     rating: 4,
//   },
//   {
//     id: 3,
//     name: "محمد حسینی",
//     position: "مهندس ناظر - پروژه ملی صنعتی",
//     comment:
//       "بهترین تامین کننده‌ای که تا حالا کار کردم. مشاوره فنی قبل از خرید و پشتیبانی بعد از فروش عالی داشتند.",
//     rating: 5,
//   },
// ];
//
// const CustomerReviews = () => (
//   <section
//     aria-label="نظرات مشتریان"
//     className="relative bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
//   >
//     <div className="max-w-7xl mx-auto relative z-10">
//       <header className="text-center mb-16 sm:mb-24 px-4">
//         <h2 className="font-DimaYekanBold text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 relative inline-block">
//           <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 blur-xl rounded-full opacity-30 dark:opacity-20 -z-10 scale-110"></span>
//           <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500">
//             نظرات مشتریان
//           </span>
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//           گوشه‌ای از بازخورد مشتریان وفادار که ما را در مسیر تعالی یاری
//           کرده‌اند.
//         </p>
//
//         <div className="max-w-xl mx-auto mt-8 sm:mt-10 px-6 py-4 sm:py-5 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-yellow-200 dark:border-yellow-700/50 shadow-xl shadow-yellow-100/40 dark:shadow-yellow-900/10 flex flex-col sm:flex-row items-center gap-4 select-none">
//           <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 p-3 rounded-full shadow-inner">
//             <FaQuoteLeft className="text-xl sm:text-2xl" />
//           </div>
//           <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 font-medium text-center sm:text-right">
//             «ما اینجاییم تا کیفیت را معنا کنیم؛ از نگاه مشتریان.»
//           </p>
//         </div>
//       </header>
//
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//         {reviews.map(({ id, comment, name, position, rating }) => (
//           <article
//             key={id}
//             tabIndex={0}
//             className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-shadow duration-300 hover:shadow-yellow-100/20 dark:hover:shadow-yellow-900/10 h-full flex flex-col focus:outline-yellow-400 transform-gpu hover:-translate-y-1"
//             style={{ willChange: "transform, box-shadow" }}
//           >
//             <div className="p-6 sm:p-8 relative flex-1">
//               <FaQuoteLeft className="absolute top-6 right-6 sm:top-8 sm:right-8 text-yellow-100 dark:text-yellow-900/30 text-4xl sm:text-6xl pointer-events-none select-none" />
//               <div className="relative z-10 h-full flex flex-col">
//                 <div
//                   className="flex mb-3 sm:mb-4"
//                   aria-label={`امتیاز ${rating} از ۵`}
//                 >
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={`text-sm sm:text-lg ${
//                         i < rating
//                           ? "text-yellow-400 dark:text-yellow-500"
//                           : "text-gray-200 dark:text-gray-700"
//                       }`}
//                       aria-hidden="true"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify flex-1 text-sm sm:text-base">
//                   {comment}
//                 </p>
//               </div>
//             </div>
//
//             <footer className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5 sm:pt-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3 sm:mr-4">
//                 <FaUser className="text-xl sm:text-2xl" aria-hidden="true" />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
//                   {name}
//                 </h4>
//                 <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//                   {position}
//                 </p>
//               </div>
//             </footer>
//           </article>
//         ))}
//       </div>
//     </div>
//   </section>
// );
//
// export default memo(CustomerReviews);


// components/CustomerReviews.jsx
import React, {memo} from "react";
import dynamic from "next/dynamic";
import {useLocale} from "../../../lib/localeContext";

const FaQuoteLeft = dynamic(() =>
    import("react-icons/fa").then((mod) => mod.FaQuoteLeft)
);
const FaUser = dynamic(() =>
    import("react-icons/fa").then((mod) => mod.FaUser)
);
const FaStar = dynamic(() =>
    import("react-icons/fa").then((mod) => mod.FaStar)
);

const CustomerReviews = () => {
    const {t} = useLocale();
    const title = t("customerReviews.title");
    const subtitle = t("customerReviews.subtitle");
    const quote = t("customerReviews.quote");
    const reviews = t("customerReviews.reviews") || [];

    return (
        <section
            aria-label={title}
            className="relative bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-16 sm:mb-24 px-4">
                    <h2 className="font-DimaYekanBold text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 relative inline-block">
                        <span
                            className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 blur-xl rounded-full opacity-30 dark:opacity-20 -z-10 scale-110"></span>
                        <span
                            className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500">
              {title}
            </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    <div
                        className="max-w-xl mx-auto mt-8 sm:mt-10 px-6 py-4 sm:py-5 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-yellow-200 dark:border-yellow-700/50 shadow-xl shadow-yellow-100/40 dark:shadow-yellow-900/10 flex flex-col sm:flex-row items-center gap-4 select-none">
                        <div
                            className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 p-3 rounded-full shadow-inner">
                            <FaQuoteLeft className="text-xl sm:text-2xl"/>
                        </div>
                        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 font-medium text-center sm:text-right">
                            {quote}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {reviews.map(({id, comment, name, position, rating, ratingAria}) => (
                        <article
                            key={id}
                            tabIndex={0}
                            className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-shadow duration-300 hover:shadow-yellow-100/20 dark:hover:shadow-yellow-900/10 h-full flex flex-col focus:outline-yellow-400 transform-gpu hover:-translate-y-1"
                            style={{willChange: "transform, box-shadow"}}
                        >
                            <div className="p-6 sm:p-8 relative flex-1">
                                <FaQuoteLeft
                                    className="absolute top-6 right-6 sm:top-8 sm:right-8 text-yellow-100 dark:text-yellow-900/30 text-4xl sm:text-6xl pointer-events-none select-none"/>
                                <div className="relative z-10 h-full flex flex-col">
                                    <div
                                        className="flex mb-3 sm:mb-4"
                                        aria-label={ratingAria}
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-sm sm:text-lg ${
                                                    i < rating
                                                        ? "text-yellow-400 dark:text-yellow-500"
                                                        : "text-gray-200 dark:text-gray-700"
                                                }`}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify flex-1 text-sm sm:text-base">
                                        {comment}
                                    </p>
                                </div>
                            </div>

                            <footer
                                className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5 sm:pt-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center">
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3 sm:mr-4">
                                    <FaUser className="text-xl sm:text-2xl" aria-hidden="true"/>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                                        {name}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        {position}
                                    </p>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(CustomerReviews);
