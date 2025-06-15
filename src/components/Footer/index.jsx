// import React, { memo, useMemo } from "react";
// import Link from "next/link";
// import {
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
//   FaClock,
//   FaAngleLeft,
// } from "react-icons/fa";
//
// // تبدیل اعداد لاتین به فارسی (برای سال)
// const toPersianDigits = (text) =>
//   text.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
//
// const unitNumberPersian = "۳۱۰";
// const phonePersian = "۰۹۸۲۳۳۴۵۵۲۰۵۵";
// const workHoursStart = "۷:۰۰";
// const workHoursEnd = "۱۸:۰۰";
//
// const Footer = () => {
//   const persianYear = useMemo(() => {
//     const year = new Date().getFullYear();
//     return toPersianDigits(year);
//   }, []);
//
//   return (
//     <footer className="bg-gradient-to-b from-gray-100 via-white to-gray-50 text-slate-800 pt-12 dark:from-[#2c3e50] dark:to-[#1a2836] dark:text-white">
//       <div className="h-1 bg-gradient-to-r from-orange-300 to-orange-500 mb-8 dark:from-orange-400 dark:to-orange-500" />
//
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         {/* درباره ما */}
//         <div>
//           <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
//             درباره میهن یدک گرمسار
//           </h3>
//           <p className="leading-7 mb-4 text-gray-700 dark:text-gray-300">
//             شرکت میهن یدک گرمسار، اولین و بزرگترین تولید‌کننده قطعات برقی
//             موتورسیکلت در ایران با بیش از ۳۱ سال تجربه است. این مجموعه با تکیه
//             بر دانش فنی، ثبت ۹ اختراع ملی، و همکاری با فنی‌وحرفه‌ای کشور،
//             گام‌های مؤثری در آموزش تعمیرکاران و ارتقاء صنعت موتورسیکلت برداشته
//             است.
//           </p>
//         </div>
//
//         {/* لینک‌ها */}
//         <div>
//           <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
//             لینک‌های سریع
//           </h3>
//           <ul className="space-y-3">
//             {[
//               { href: "/", text: "صفحه اصلی" },
//               { href: "/products", text: "محصولات" },
//               { href: "/inventions", text: "نمونه اختراعات" },
//               { href: "/contact-us", text: "تماس با ما" },
//               { href: "/about-us", text: "درباره ما" },
//             ].map(({ href, text }, i) => (
//               <li key={i}>
//                 <Link
//                   href={href}
//                   className="flex items-center text-slate-700 hover:text-orange-500 transition dark:text-gray-200 dark:hover:text-orange-400"
//                 >
//                   <FaAngleLeft className="ml-2" /> {text}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//
//         {/* تماس با ما */}
//         <div>
//           <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
//             تماس با ما
//           </h3>
//           <div className="space-y-4 text-slate-700 text-sm dark:text-gray-300">
//             <div className="flex items-start">
//               <FaMapMarkerAlt className="ml-3 mt-1 text-orange-400 dark:text-orange-400" />
//               تهران، دفتر فروش: خیابان مولوی، نرسیده به میدان رازی، پاساژ بهمن، طبقه سوم، واحد{" "}
//               {unitNumberPersian}
//             </div>
//             <div className="flex items-start">
//               <FaPhone className="ml-3 mt-1 text-orange-400 dark:text-orange-400" />
//               <a href="tel:0982334552055" className="hover:underline">
//                 {phonePersian}
//               </a>
//             </div>
//             <div className="flex items-start">
//               <FaEnvelope className="ml-3 mt-1 text-orange-400 dark:text-orange-400" />
//               <a
//                 href="mailto:info@MihanYadakGarmsar.ir"
//                 className="hover:underline break-all"
//               >
//                 info@MihanYadakGarmsar.ir
//               </a>
//             </div>
//             <div className="flex items-start">
//               <FaClock className="ml-3 mt-1 text-orange-400 dark:text-orange-400" />
//               شنبه تا چهارشنبه {workHoursStart} تا {workHoursEnd}
//             </div>
//           </div>
//         </div>
//
//         {/* نقشه */}
//         <div>
//           <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
//             موقعیت ما
//           </h3>
//           <div className="h-48 rounded-lg border-2 border-orange-300 overflow-hidden dark:border-orange-400">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.1747979369381!2d52.33097381657799!3d35.22492264878078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f90ed10522c4211%3A0x1aff9090edd0cb2!2sMIHAN%20YADAK%20GARMSAR!5e0!3m2!1sen!2s!4v1746451203225!5m2!1sen!2s"
//               className="w-full h-full"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             />
//             <span className="text-center block w-full mt-2 text-sm text-slate-600 dark:text-gray-300">
//               آدرس دفتر مرکزی
//             </span>
//           </div>
//         </div>
//       </div>
//
//       {/* کپی رایت */}
//       <div className="bg-white mt-12 p-5 text-center text-sm text-slate-500 border-t border-orange-200 dark:bg-[#1a2836] dark:text-gray-400 dark:border-white/10">
//         <p>
//           کلیه حقوق و امتیازات این وبسایت متعلق به مجموعه{" "}
//           <span className="font-bold text-xl text-orange-500 dark:text-orange-400 inline-block mx-2">
//             میهن یدک
//           </span>
//           بوده و هرگونه استفاده از مطالب این وبسایت، پیگرد قانونی دارد.
//         </p>
//         <p className="mt-2 text-xs">
//           © {persianYear} توسعه یافته توسط تیم مهرسین (
//           <a
//             href="mailto:mehrrsinn@gmail.com"
//             className="hover:underline text-orange-500 dark:text-orange-400"
//           >
//             mehrrsinn@gmail.com
//           </a>
//           )
//         </p>
//       </div>
//     </footer>
//   );
// };
//
// export default memo(Footer);


// components/Footer.jsx
import React, {memo, useMemo} from "react";
import Link from "next/link";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaAngleLeft,
} from "react-icons/fa";
import {useLocale} from "../../../lib/localeContext";

// تبدیل اعداد لاتین به فارسی (برای سال)
const toPersianDigits = (text) =>
    text.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const unitNumberPersian = "۳۱۰";
const workHoursStart = "۷:۰۰";
const workHoursEnd = "۱۸:۰۰";

const Footer = () => {
    const {t} = useLocale();
    const persianYear = useMemo(() => {
        const year = new Date().getFullYear();
        return toPersianDigits(year);
    }, []);

    // داده‌های ترجمه‌شده
    const aboutTitle = t("footer.about.title");
    const aboutDesc = t("footer.about.desc");

    const linksTitle = t("footer.links.title");
    const links = t("footer.links.items") || [];

    const contactTitle = t("footer.contact.title");
    const contactAddress = t("footer.contact.address");
    const contactPhone = t("footer.contact.phone");
    const contactEmail = t("footer.contact.email");
    const workDays = t("footer.contact.workDays");
    const sep = t("footer.contact.workHoursSeparator");

    const locationTitle = t("footer.location.title");
    const locationCaption = t("footer.location.caption");

    const cp1 = t("footer.copyright.text1");
    const cpCompany = t("footer.copyright.companyName");
    const cpSuffix = t("footer.copyright.text1Suffix");
    const dev = t("footer.copyright.developerPrefix");

    return (
        <footer
            className="bg-gradient-to-b from-gray-100 via-white to-gray-50 text-slate-800 pt-12 dark:from-[#2c3e50] dark:to-[#1a2836] dark:text-white">
            <div
                className="h-1 bg-gradient-to-r from-orange-300 to-orange-500 mb-8 dark:from-orange-400 dark:to-orange-500"/>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* درباره ما */}
                <div>
                    <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
                        {aboutTitle}
                    </h3>
                    <p className="leading-7 mb-4 text-gray-700 dark:text-gray-300">
                        {aboutDesc}
                    </p>
                </div>

                {/* لینک‌ها */}
                <div>
                    <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
                        {linksTitle}
                    </h3>
                    <ul className="space-y-3">
                        {links.map(({href, text}, i) => (
                            <li key={i}>
                                <Link
                                    href={href}
                                    className="flex items-center text-slate-700 hover:text-orange-500 transition dark:text-gray-200 dark:hover:text-orange-400"
                                >
                                    <FaAngleLeft className="ml-2"/> {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* تماس با ما */}
                <div>
                    <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
                        {contactTitle}
                    </h3>
                    <div className="space-y-4 text-slate-700 text-sm dark:text-gray-300">
                        <div className="flex items-start">
                            <FaMapMarkerAlt className="ml-3 mt-1 text-orange-400 dark:text-orange-400"/>
                            {contactAddress} {unitNumberPersian}
                        </div>
                        <div className="flex items-start">
                            <FaPhone className="ml-3 mt-1 text-orange-400 dark:text-orange-400"/>
                            <a href={`tel:${contactPhone}`} className="hover:underline">
                                {contactPhone}
                            </a>
                        </div>
                        <div className="flex items-start">
                            <FaEnvelope className="ml-3 mt-1 text-orange-400 dark:text-orange-400"/>
                            <a
                                href={`mailto:${contactEmail}`}
                                className="hover:underline break-all"
                            >
                                {contactEmail}
                            </a>
                        </div>
                        <div className="flex items-start">
                            <FaClock className="ml-3 mt-1 text-orange-400 dark:text-orange-400"/>
                            {workDays} {workHoursStart} {sep} {workHoursEnd}
                        </div>
                    </div>
                </div>

                {/* نقشه */}
                <div>
                    <h3 className="text-orange-500 text-lg font-bold mb-6 pb-2 border-b-[2px] border-orange-500 dark:border-orange-500">
                        {locationTitle}
                    </h3>
                    <div className="h-48 rounded-lg border-2 border-orange-300 overflow-hidden dark:border-orange-400">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.1747979369381!2d52.33097381657799!3d35.22492264878078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f90ed10522c4211%3A0x1aff9090edd0cb2!2sMIHAN%20YADAK%20GARMSAR!5e0!3m2!1sen!2s!4v1746451203225!5m2!1sen!2s"
                            className="w-full h-full"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <span className="text-center block w-full mt-2 text-sm text-slate-600 dark:text-gray-300">
              {locationCaption}
            </span>
                    </div>
                </div>
            </div>

            {/* کپی رایت */}
            <div
                className="bg-white mt-12 p-5 text-center text-sm text-slate-500 border-t border-orange-200 dark:bg-[#1a2836] dark:text-gray-400 dark:border-white/10">
                <p>
                    {cp1}{" "}
                    <span className="font-bold text-xl text-orange-500 dark:text-orange-400 inline-block mx-2">
            {cpCompany}
          </span>
                    {cpSuffix}
                </p>
                <p className="mt-2 text-xs">
                    © {persianYear} {dev} (
                    <a
                        href="mailto:mehrrsinn@gmail.com"
                        className="hover:underline text-orange-500 dark:text-orange-400"
                    >
                        mehrrsinn@gmail.com
                    </a>
                    )
                </p>
            </div>
        </footer>
    );
};

export default memo(Footer);
