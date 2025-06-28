//
//
// // ── /src/pages/components/HeroSection.js ──
// import { motion } from "framer-motion";
// import Link from "next/link";
// import HeroBackground from "../HeroBackground";
// import Image from "next/image";
// import { AiOutlineCheck } from "react-icons/ai";
// import { useLocale } from "../../../lib/localeContext";
// import { toLatinDigits } from "../../../lib/numberUtils";
//
// const HeroSection = () => {
//   const { locale, t } = useLocale();
//
//   // همهٔ متن‌های ثابت را از فایل ترجمه می‌خوانیم
//   const descriptionRaw = t("hero.description");
//   const statsRaw = t("hero.stats");
//
//   // در صورت انگلیسی بودن، اعداد فارسی را به لاتین تبدیل می‌کنیم
//   const descriptionText =
//     locale === "en" ? toLatinDigits(descriptionRaw) : descriptionRaw;
//   const statsText = locale === "en" ? toLatinDigits(statsRaw) : statsRaw;
//
//   return (
//     <section className="relative pb-32 pt-12 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
//       <HeroBackground />
//
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
//         {/* متن سمت چپ */}
//         <motion.div
//           className="w-full lg:w-1/2 text-center lg:text-right md:mt-[9.5rem]"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {/* عنوان برند به‌صورت دو کلید جداگانه */}
//           <h1 className="text-5xl font-DimaYekanBold text-black dark:text-white sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
//             {t("hero.title_brand_part1")}
//             <span className="text-orange-500 inline-block mx-1.5">
//               {t("hero.title_brand_part2")}
//             </span>
//           </h1>
//
//           {/* توضیحات (از فایل ترجمه) */}
//           <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//             {descriptionText}
//           </p>
//
//           {/* آمار (از فایل ترجمه) */}
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
//             {statsText}
//           </p>
//
//           {/* دکمه‌ها و نکات برجسته */}
//           <motion.div
//             className="flex flex-wrap justify-center lg:justify-start gap-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             {/* دکمهٔ مشاهدهٔ محصولات */}
//             <Link
//               href={locale === "en" ? "/en/products" : "/products"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base bg-orange-500 text-white hover:bg-orange-600"
//             >
//               {t("hero.button_products")}
//             </Link>
//
//             {/* دکمهٔ تماس با ما */}
//             <Link
//               href={locale === "en" ? "/en/contactUs" : "/contactUs"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
//             >
//               {t("hero.button_contact")}
//             </Link>
//
//             {/* نکات برجسته (از کلیدهای ترجمه) */}
//             <ul className="flex flex-col">
//               <li className="flex gap-3">
//                 <AiOutlineCheck className="text-green-500 text-2xl" />
//                 {locale === "en"
//                   ? toLatinDigits(t("hero.highlight_1"))
//                   : t("hero.highlight_1")}
//               </li>
//               <li className="flex gap-3">
//                 <AiOutlineCheck className="text-green-500 text-2xl" />
//                 {locale === "en"
//                   ? toLatinDigits(t("hero.highlight_2"))
//                   : t("hero.highlight_2")}
//               </li>
//               <li className="flex gap-3">
//                 <AiOutlineCheck className="text-green-500 text-2xl" />
//                 {locale === "en"
//                   ? toLatinDigits(t("hero.highlight_3"))
//                   : t("hero.highlight_3")}
//               </li>
//               <li className="flex gap-3">
//                 <AiOutlineCheck className="text-green-500 text-2xl" />
//                 {locale === "en"
//                   ? toLatinDigits(t("hero.highlight_4"))
//                   : t("hero.highlight_4")}
//               </li>
//             </ul>
//           </motion.div>
//         </motion.div>
//
//         {/* تصویر سمت راست */}
//         <motion.div
//           className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative w-[250px] mt-[9.5rem] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
//             <Image
//               src={t("hero.image_src")}
//               alt={t("hero.image_alt")}
//               fill
//               sizes="(min-width: 1024px) 50vw, 100vw"
//               priority
//               className="object-cover"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
//
// export default HeroSection;

//
//
// // ── /src/pages/components/HeroSection.js ──
// import { motion } from "framer-motion";
// import Link from "next/link";
// import HeroBackground from "../HeroBackground";
// import Image from "next/image";
// import { AiOutlineCheck } from "react-icons/ai";
// import { useLocale } from "../../../lib/localeContext";
// import { toLatinDigits } from "../../../lib/numberUtils";
//
// const HeroSection = () => {
//   const { locale, t } = useLocale();
//
//   // همهٔ متن‌های ثابت را از فایل ترجمه می‌خوانیم
//   const descriptionRaw = t("hero.description");
//   const statsRaw = t("hero.stats");
//
//   // در صورت انگلیسی بودن، اعداد فارسی را به لاتین تبدیل می‌کنیم
//   const descriptionText =
//     locale === "en" ? toLatinDigits(descriptionRaw) : descriptionRaw;
//   const statsText = locale === "en" ? toLatinDigits(statsRaw) : statsRaw;
//
//   // تابع برای نرمال‌سازی src تصویر
//   const normalizeSrc = (src) => {
//     if (typeof src !== "string" || !src.trim()) {
//       // placeholder اگر کلید ترجمه خالی یا undefined بود
//       return "/placeholder.png";
//     }
//     // اگر URL مطلق بود
//     if (/^https?:\/\//.test(src)) return src;
//     // اگر با / شروع شده
//     if (src.startsWith("/")) return src;
//     // در غیر این صورت، یک / ابتدای رشته اضافه می‌کنیم
//     return `/${src}`;
//   };
//
//   const rawSrc = t("hero.image_src");
//   const imgSrc = normalizeSrc(rawSrc);
//   const imgAlt = t("hero.image_alt") || "Hero image";
//
//   return (
//     <section className="relative pb-32 pt-12 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
//       <HeroBackground />
//
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
//         {/* متن سمت چپ */}
//         <motion.div
//           className="w-full lg:w-1/2 text-center lg:text-right md:mt-[9.5rem]"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-5xl font-DimaYekanBold text-black dark:text-white sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
//             {t("hero.title_brand_part1")}
//             <span className="text-orange-500 inline-block mx-1.5">
//               {t("hero.title_brand_part2")}
//             </span>
//           </h1>
//
//           <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//             {descriptionText}
//           </p>
//
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
//             {statsText}
//           </p>
//
//           <motion.div
//             className="flex flex-wrap justify-center lg:justify-start gap-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <Link
//               href={locale === "en" ? "/en/products" : "/products"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base bg-orange-500 text-white hover:bg-orange-600"
//             >
//               {t("hero.button_products")}
//             </Link>
//
//             <Link
//               href={locale === "en" ? "/en/contact-us" : "/contact-us"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
//             >
//               {t("hero.button_contact")}
//             </Link>
//
//             <div className="flex flex-col text-dark dark:text-slate-100">
//               {[1,2,3,4].map((i) => (
//                 <div key={i} className="flex gap-3">
//                   <AiOutlineCheck className="text-green-500 text-2xl" />
//                   {locale === "en"
//                     ? toLatinDigits(t(`hero.highlight_${i}`))
//                     : t(`hero.highlight_${i}`)}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//
//         {/* تصویر سمت راست */}
//         <motion.div
//           className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative w-[250px] mt-[9.5rem] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
//             <Image
//               src={imgSrc}
//               alt={imgAlt}
//               fill
//               sizes="(min-width: 1024px) 50vw, 100vw"
//               priority
//               className="object-cover"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
//
// export default HeroSection;
//
// // ── /src/pages/components/HeroSection.js ──
// import { motion } from "framer-motion";
// import Link from "next/link";
// import HeroBackground from "../HeroBackground";
// import Image from "next/image";
// import { AiOutlineCheck } from "react-icons/ai";
// import { useLocale } from "../../../lib/localeContext";
// import { toLatinDigits } from "../../../lib/numberUtils";
//
// const HeroSection = () => {
//   const { locale, t } = useLocale();
//
//   // همهٔ متن‌های ثابت را از فایل ترجمه می‌خوانیم
//   const descriptionRaw = t("hero.description");
//   const statsRaw = t("hero.stats");
//
//   // در صورت انگلیسی بودن، اعداد فارسی را به لاتین تبدیل می‌کنیم
//   const descriptionText =
//     locale === "en" ? toLatinDigits(descriptionRaw) : descriptionRaw;
//   const statsText = locale === "en" ? toLatinDigits(statsRaw) : statsRaw;
//
//   // تابع برای نرمال‌سازی src تصویر
//   const normalizeSrc = (src) => {
//     if (typeof src !== "string" || !src.trim()) {
//       // placeholder اگر کلید ترجمه خالی یا undefined بود
//       return "/placeholder.png";
//     }
//     // اگر URL مطلق بود
//     if (/^https?:\/\//.test(src)) return src;
//     // اگر با / شروع شده
//     if (src.startsWith("/")) return src;
//     // در غیر این صورت، یک / ابتدای رشته اضافه می‌کنیم
//     return `/${src}`;
//   };
//
//   const rawSrc = t("hero.image_src");
//   const imgSrc = normalizeSrc(rawSrc);
//   const imgAlt = t("hero.image_alt") || "Hero image";
//
//   return (
//     <section className="relative pb-32 pt-12 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
//       <HeroBackground />
//
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
//         {/* متن سمت چپ */}
//         <motion.div
//           className="w-full lg:w-1/2 text-center lg:text-right mt-10 lg:mt-[9.5rem]"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-5xl font-DimaYekanBold text-black dark:text-white sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
//             {t("hero.title_brand_part1")}
//             <span className="text-orange-500 inline-block mx-1.5">
//               {t("hero.title_brand_part2")}
//             </span>
//           </h1>
//
//           <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//             {descriptionText}
//           </p>
//
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
//             {statsText}
//           </p>
//
//           <motion.div
//             className="flex flex-wrap justify-center lg:justify-start gap-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <Link
//               href={locale === "en" ? "/en/products" : "/products"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base bg-orange-500 text-white hover:bg-orange-600"
//             >
//               {t("hero.button_products")}
//             </Link>
//
//             <Link
//               href={locale === "en" ? "/en/contact-us" : "/contact-us"}
//               className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
//             >
//               {t("hero.button_contact")}
//             </Link>
//
//             <div className="flex flex-col text-gray-900 dark:text-slate-100">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex gap-3 items-center">
//                   <AiOutlineCheck className="text-green-500 text-2xl" />
//                   {locale === "en"
//                     ? toLatinDigits(t(`hero.highlight_${i}`))
//                     : t(`hero.highlight_${i}`)}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//
//         {/* تصویر سمت راست */}
//         <motion.div
//           className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative w-[250px] mt-10 lg:mt-[9.5rem] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
//             <Image
//               src={imgSrc}
//               alt={imgAlt}
//               fill
//               sizes="(min-width: 1024px) 50vw, 100vw"
//               priority
//               className="object-cover"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
//
// export default HeroSection;



// ── /src/pages/components/HeroSection.js ──
import { motion } from "framer-motion";
import Link from "next/link";
import HeroBackground from "../HeroBackground";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { useLocale } from "../../../lib/localeContext";
import { toLatinDigits } from "../../../lib/numberUtils";

const HeroSection = () => {
  const { locale, t } = useLocale();

  // متون
  const descriptionRaw = t("hero.description");
  const statsRaw = t("hero.stats");
  const descriptionText =
    locale === "en" ? toLatinDigits(descriptionRaw) : descriptionRaw;
  const statsText = locale === "en" ? toLatinDigits(statsRaw) : statsRaw;

  // نرمالایز کردن src تصویر
  const normalizeSrc = (src) => {
    if (typeof src !== "string" || !src.trim()) return "/placeholder.png";
    if (/^https?:\/\//.test(src)) return src;
    return src.startsWith("/") ? src : `/${src}`;
  };
  const imgSrc = normalizeSrc(t("hero.image_src"));
  const imgAlt = t("hero.image_alt") || "Hero image";

  return (
    <section className="relative pb-32 pt-12 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* متن سمت چپ */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-right mt-10 lg:mt-[9.5rem]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-DimaYekanBold text-black dark:text-white sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            {t("hero.title_brand_part1")}
            <span className="text-orange-500 inline-block mx-1.5">
              {t("hero.title_brand_part2")}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {descriptionText}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            {statsText}
          </p>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={locale === "en" ? "/en/products" : "/products"}
              className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base bg-orange-500 text-white hover:bg-orange-600"
            >
              {t("hero.button_products")}
            </Link>
            <Link
              href={locale === "en" ? "/en/contact-us" : "/contact-us"}
              className="transition duration-300 font-semibold py-3 px-6 rounded-xl shadow-md text-base border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              {t("hero.button_contact")}
            </Link>

            {/* لیست highlight با گرید */}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-6 text-gray-900 dark:text-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <AiOutlineCheck className="text-green-500 text-2xl" />
                  {locale === "en"
                    ? toLatinDigits(t(`hero.highlight_${i}`))
                    : t(`hero.highlight_${i}`)}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* تصویر سمت راست */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
