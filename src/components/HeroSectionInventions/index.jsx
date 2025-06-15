// import React, { memo } from "react";
// import { FaBolt, FaLightbulb, FaTools, FaShieldAlt } from "react-icons/fa";
// import { GiElectric, GiMechanicalArm } from "react-icons/gi";
// import { MdGavel } from "react-icons/md";
// import Link from "next/link";


// const features = [
//     {
//         Icon: GiMechanicalArm,
//         title: "بهبود عملکرد",
//         desc: "ارتقاء عملکرد موتورسیکلت‌ها",
//     },
//     {
//         Icon: FaShieldAlt,
//         title: "افزایش ایمنی",
//         desc: "سیستم‌های ایمنی پیشرفته",
//     },
//     {
//         Icon: GiElectric,
//         title: "صرفه‌جویی انرژی",
//         desc: "بهینه‌سازی مصرف برق",
//     },
//     {
//         Icon: FaTools,
//         title: "کاربرد گسترده",
//         desc: "قابل استفاده در وسایل نقلیه مختلف",
//     },
// ];

// const HeroSectionInventions = memo(({ Hero }) => {
//     return (
//         <section
//             className="relative bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-white py-24 overflow-hidden">
//             <div className="relative z-10 container mx-auto px-4">
//                 <div className="flex flex-col lg:flex-row items-center gap-12">
//                     {/* Text Section */}
//                     <div className="lg:w-1/2 space-y-8">
//                         <div
//                             aria-label={`${Hero.count} اختراع ثبت شده`}
//                             className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/20 dark:border-amber-400/30 mx-auto lg:mx-0"
//                         >
//                             <MdGavel className="text-amber-400 text-xl" />
//                             <span className="text-sm font-medium">
//                                 {Hero.count} اختراع ثبت شده
//                             </span>
//                         </div>

//                         <h1 className="text-4xl font-DimaYekanBold md:text-6xl font-bold leading-tight text-center lg:text-start">
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
//                                 اختراعات نوآورانه
//                             </span>
//                             <br />
//                             در قطعات برقی موتورسیکلت
//                         </h1>

//                         <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//                             شرکت میهن یدک گرمسار با{" "}
//                             <span className="font-semibold text-amber-500">
//                                 {Hero.count} اختراع ثبت شده
//                             </span>{" "}
//                             در زمینه قطعات برقی موتورسیکلت، پیشگام در ارتقاء عملکرد و ایمنی
//                             وسایل نقلیه است.
//                         </p>

//                         <ul className="space-y-3 text-slate-700 dark:text-slate-300">
//                             {Hero.inventions?.map((title, index) => (
//                                 <li
//                                     key={index}
//                                     className="flex gap-4 items-start"
//                                     aria-label={`اختراع: ${title}`}
//                                 >
//                                     <FaBolt className="text-amber-400 mt-1" />
//                                     <span>{title}</span>
//                                 </li>
//                             ))}
//                         </ul>

//                         <div className="flex flex-wrap gap-4 pt-6">
//                             <Link
//                                 href="/about-us"
//                                 aria-label="درباره ما"
//                                 className="relative bg-gradient-to-r from-amber-300 to-amber-400 dark:from-amber-500 dark:to-amber-600 hover:from-amber-400 hover:to-amber-500 dark:hover:from-amber-600 dark:hover:to-amber-700 text-slate-900 font-bold px-8 py-4 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg shadow-amber-300/30 dark:shadow-amber-500/20"
//                             >
//                                 درباره ما
//                             </Link>

//                             <Link
//                                 href="/contact-us"
//                                 aria-label=" تماس با ما "
//                                 className="relative border-2 border-amber-400 text-amber-500 dark:text-amber-400 hover:text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors duration-300 overflow-hidden"
//                             >
//                                 تماس با ما
//                                 <span
//                                     className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Image & Features */}
//                     <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
//                         <div className="relative w-full max-w-lg">
//                             <div
//                                 className="relative bg-slate-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-500 backdrop-blur-sm bg-opacity-50">
//                                 <div className="flex justify-center mb-8">
//                                     <div className="relative">
//                                         <FaLightbulb className="text-amber-400 text-8xl z-10 relative" />
//                                         <div
//                                             className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 -z-10" />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4">
//                                     {features.map(({ Icon, title, desc }, i) => (
//                                         <div
//                                             key={i}
//                                             className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl text-center transition-all duration-300 border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
//                                         >
//                                             <Icon className="text-amber-400 text-3xl mx-auto" />
//                                             <div className="font-medium mt-2">{title}</div>
//                                             <div className="text-xs text-slate-500 dark:text-slate-400">
//                                                 {desc}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// });

// export default HeroSectionInventions;
import React, { memo } from "react";
import { FaBolt, FaLightbulb, FaTools, FaShieldAlt } from "react-icons/fa";
import { GiElectric, GiMechanicalArm } from "react-icons/gi";
import { MdGavel } from "react-icons/md";
import Link from "next/link";
import { useLocale } from "../../../lib/localeContext";

// آرایه آیکون‌ها رو اینجا نگه می‌داریم چون ثابت هستن
const icons = [GiMechanicalArm, FaShieldAlt, GiElectric, FaTools];

const HeroSectionInventions = memo(({ Hero }) => {
    const { t } = useLocale();
    const features = t("inventions.hero.features");

    return (
        <section
            className="relative bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-white py-24 overflow-hidden"
        >
            <div className="relative z-10 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Section */}
                    <div className="lg:w-1/2 space-y-8">
                        <div
                            aria-label={t("inventions.hero.registered_inventions").replace("{count}", Hero.count)}
                            className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/20 dark:border-amber-400/30 mx-auto lg:mx-0"
                        >
                            <MdGavel className="text-amber-400 text-xl" />
                            <span className="text-sm font-medium">
                                {t("inventions.hero.registered_inventions").replace("{count}", Hero.count)}
                            </span>
                        </div>

                        <h1 className="text-4xl font-DimaYekanBold md:text-6xl font-bold leading-tight text-center lg:text-start">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                {t("inventions.hero.title_highlight")}
                            </span>
                            <br />
                            {t("inventions.hero.title_rest")}
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            {t("inventions.hero.description").replace("{count}", Hero.count)}
                        </p>

                        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                            {Hero.inventions?.map((title, index) => (
                                <li
                                    key={index}
                                    className="flex gap-4 items-start"
                                    aria-label={`${t("invention")}: ${title}`}
                                >
                                    <FaBolt className="text-amber-400 mt-1" />
                                    <span>{title}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <Link
                                href="/about-us"
                                aria-label={t("hero.about_us")}
                                className="relative bg-gradient-to-r from-amber-300 to-amber-400 dark:from-amber-500 dark:to-amber-600 hover:from-amber-400 hover:to-amber-500 dark:hover:from-amber-600 dark:hover:to-amber-700 text-slate-900 font-bold px-8 py-4 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg shadow-amber-300/30 dark:shadow-amber-500/20"
                            >
                                {t("inventions.hero.about_us")}
                            </Link>

                            <Link
                                href="/contact-us"
                                aria-label={t("inventions.hero.contact_us")}
                                className="relative border-2 border-amber-400 text-amber-500 dark:text-amber-400 hover:text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors duration-300 overflow-hidden"
                            >
                                {t("inventions.hero.contact_us")}
                                <span
                                    className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Image & Features */}
                    <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
                        <div className="relative w-full max-w-lg">
                            <div
                                className="relative bg-slate-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-500 backdrop-blur-sm bg-opacity-50"
                            >
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <FaLightbulb className="text-amber-400 text-8xl z-10 relative" />
                                        <div
                                            className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 -z-10"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {features?.map((feature, i) => {
                                        const Icon = icons[i];
                                        return (
                                            <div
                                                key={i}
                                                className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl text-center transition-all duration-300 border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
                                            >
                                                <Icon className="text-amber-400 text-3xl mx-auto" />
                                                <div className="font-medium mt-2">{feature.title}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                                    {feature.desc}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default HeroSectionInventions;