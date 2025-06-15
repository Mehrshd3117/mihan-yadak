// import Link from "next/link";
//
// const Faq = ({ faqs = [] }) => {
//   return (
//     <>
//       <section className="w-full bg-orange-400 text-white py-20 px-6 text-center ">
//         <h1 className="text-4xl md:text-5xl font-DimaYekanBold font-extrabold mb-6 leading-snug border-b border-white pb-5">
//           <span className="text-5xl md:tetx-6xl text-slate-800   ">
//             میهن یدک گرمسار
//           </span>
//           ؛ جایی که
//           <span className="text-5xl md:tetx-6xl text-slate-800 inline-block mx-1.5">
//             قدرت
//           </span>
//           بی ادعا ساخته میشه !
//         </h1>
//         <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
//           انتخابی مطمئن برای کسانی که کیفیت، پشتیبانی و دوام را در
//           کنار هم می‌خواهند.
//         </p>
//       </section>
//       <div className="w-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white  py-5">
//         <div className="bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto my-28 border border-gray-100 dark:border-slate-700">
//           <div className="w-full p-6 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-white dark:to-gray-100"></div>
//             <div className="relative z-10">
//               <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-200 dark:from-gray-900 dark:to-gray-800">
//                   سوالات متداول
//                 </span>
//               </h2>
//               <p className="text-orange-100 dark:text-slate-900 text-center mt-5">
//                 به سوالات شما پاسخ داده‌ایم
//               </p>
//             </div>
//           </div>
//
//           <div className="px-5 sm:px-8 py-2 space-y-1">
//             {faqs.map((item, index) => (
//               <details
//                 key={item._id || index}
//                 className="group rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 transition-colors duration-200
//                 open:bg-orange-50 open:border-orange-200 dark:open:bg-slate-800 dark:open:border-orange-500"
//               >
//                 <summary
//                   className="cursor-pointer select-none py-5 px-4 text-right flex justify-between items-center text-lg sm:text-xl font-medium
//                   text-gray-800 dark:text-gray-300
//                   hover:text-orange-500 dark:hover:text-orange-300
//                   focus:outline-none"
//                 >
//                   <span className="flex-1">{item.question}</span>
//                   <svg
//                     className="ml-3 w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-open:rotate-180"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </summary>
//                 <div className="px-4 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
//                   {item.answer}
//                 </div>
//               </details>
//             ))}
//           </div>
//           <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 dark:bg-slate-800 rounded-xl border border-orange-100 dark:border-slate-700 text-center">
//             <h3 className="text-lg font-medium text-gray-800 mb-2">
//               پاسخ خود را نیافتید؟
//             </h3>
//             <p className="text-gray-800 dark:text-gray-600 mb-4">
//               کارشناسان ما آماده پاسخگویی به سوالات شما هستند
//             </p>
//             <Link
//               href="/contact-us"
//               className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
//             >
//               تماس با ما
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Faq;
//
//
// // src/components/Faq/index.jsx
// import React from "react";
// import fa from "../../../locales/fa/common.json";
// import en from "../../../locales/en/common.json";
// import {useLocale} from "../../../lib/localeContext";
//
// const translations = {
//   fa: fa.faq,
//   en: en.faq,
// };
//
// export default function Faq() {
//   const { locale } = useLocale();        // 'fa' یا 'en'
//   const { title, subtitle, noAnswerTitle, noAnswerDesc, items } =
//     translations[locale] || translations.fa;
//
//   // items همانی است که در فایل ترجمه گذاشتی
//   // ولی بخاطر اینکه data/faq.js طول آرایه‌ها رو مشخص می‌کنه،
//   // می‌تونیم از هر دو استفاده کنیم یا مستقیماً همین items را بگیریم:
//   const list = Array.isArray(items) ? items : [];
//
//   return (
//     <section className="w-full py-10 bg-gray-50 dark:bg-slate-900">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
//             {title}
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 dark:text-slate-300">
//             {subtitle}
//           </p>
//         </div>
//
//         <div className="space-y-4">
//           {list.length > 0 ? (
//             list.map((item, index) => (
//               <details
//                 key={index}
//                 className="group rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4"
//               >
//                 <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
//                   {item.question}
//                 </summary>
//                 <div className="mt-2 text-gray-700 dark:text-slate-300 whitespace-pre-line">
//                   {item.answer}
//                 </div>
//               </details>
//             ))
//           ) : (
//             <div className="text-center py-10">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {noAnswerTitle}
//               </h3>
//               <p className="mt-2 text-gray-600 dark:text-slate-300">
//                 {noAnswerDesc}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


// components/Faq.jsx
import Link from "next/link";
import {useLocale} from "../../../lib/localeContext";

const Faq = () => {
    const {t} = useLocale();
    const faqItems = t('faq.items') || [];

    return (
        <>
            <section className="w-full bg-orange-400 text-white py-20 px-6 text-center ">
                <h1 className="text-4xl md:text-5xl font-DimaYekanBold font-extrabold mb-6 leading-snug border-b border-white pb-5">
        <span className="text-5xl md:tetx-6xl text-slate-800">
          {t("hero-faq.brand")}
        </span>
                    ؛ {t("hero-faq.prefix")}
                    <span className="text-5xl md:tetx-6xl text-slate-800 inline-block mx-1.5">
          {t("hero-faq.highlight")}
        </span>
                    {t("hero-faq.suffix")}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
                    {t("hero-faq.subtitle")}
                </p>
            </section>

            <div className="w-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white  py-5">
                <div
                    className="bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto my-28 border border-gray-100 dark:border-slate-700">

                    {/* عنوان و زیرعنوان FAQ */}
                    <div className="w-full p-6 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-white dark:to-gray-100"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-200 dark:from-gray-900 dark:to-gray-800">
                  {t('faq.title')}
                </span>
                            </h2>
                            <p className="text-orange-100 dark:text-slate-900 text-center mt-5">
                                {t('faq.subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* لیست سوالات */}
                    <div className="px-5 sm:px-8 py-2 space-y-1">
                        {faqItems.map((item, index) => (
                            <details
                                key={index}
                                className="group rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 transition-colors duration-200
                  open:bg-orange-50 open:border-orange-200 dark:open:bg-slate-800 dark:open:border-orange-500"
                            >
                                <summary
                                    className="cursor-pointer select-none py-5 px-4 text-right flex justify-between items-center text-lg sm:text-xl font-medium
                    text-gray-800 dark:text-gray-300
                    hover:text-orange-500 dark:hover:text-orange-300
                    focus:outline-none"
                                >
                                    <span className="flex-1" dir="ltr">{item.question}</span>
                                    <svg
                                        className="ml-3 w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-open:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div
                                    className="px-4 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* بخش بدون پاسخ (همیشه نمایش داده میشه) */}
                    <div
                        className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 dark:bg-slate-800 rounded-xl border border-orange-100 dark:border-slate-700 text-center">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {t('faq.noAnswerTitle')}
                        </h3>
                        <p className="text-gray-800 dark:text-gray-600 mb-4">
                            {t('faq.noAnswerDesc')}
                        </p>
                        <Link
                            href="/contact-us"
                            className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {t("hero-faq.contact")}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;



