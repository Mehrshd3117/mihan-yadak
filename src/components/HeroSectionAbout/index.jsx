// import React, { memo, useMemo } from "react";
// import Head from "next/head";
// import {
//   BadgeCheck,
//   Users,
//   Wrench,
//   Lightbulb,
//   ShieldCheck,
//   School,
// } from "lucide-react";
//
// const iconMap = {
//   BadgeCheck,
//   Users,
//   Wrench,
//   Lightbulb,
//   ShieldCheck,
//   School,
// };
//
// const FeatureCard = memo(function FeatureCard({ Icon, title, description }) {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-orange-200 p-4 md:p-6 text-center border border-gray-100 dark:border-gray-700 w-full transition-shadow duration-300">
//       <div className="flex justify-center mb-3 md:mb-4">
//         <div className="bg-gradient-to-tr from-orange-100 to-orange-200 rounded-full p-2 md:p-3">
//           <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
//         </div>
//       </div>
//       <h3 className="text-base md:text-lg font-bold text-orange-500 my-3 md:my-5">
//         {title}
//       </h3>
//       <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
//         {description}
//       </p>
//     </div>
//   );
// });
//
// const HeroSectionAbout = memo(function HeroSectionAbout({
//   features = [],
//   description,
//   keywords,
// }) {
//   const cards = useMemo(
//     () =>
//       features.map(({ icon, title, description }, idx) => {
//         const IconComponent = iconMap[icon] || (() => null);
//         return (
//           <FeatureCard
//             key={title || idx}
//             Icon={IconComponent}
//             title={title}
//             description={description}
//           />
//         );
//       }),
//     [features]
//   );
//
//   return (
//     <>
//       <Head>
//         {description && <meta name="description" content={description} />}
//         {keywords && <meta name="keywords" content={keywords} />}
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta charSet="utf-8" />
//       </Head>
//
//       <section className="bg-gray-50 py-20 md:py-40 dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-4 md:px-16 font-vazir">
//         {/* Intro */}
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="mt-5 font-IranNastaliq text-3xl md:text-5xl font-extrabold text-orange-500 mb-6 leading-tight">
//             نامی شناخته‌شده، کیفیتی به اثبات رسیده
//           </h1>
//
//           <p
//             className="max-w-6xl mx-auto p-6 md:p-12
//               bg-gradient-to-br from-orange-50 via-white to-orange-100
//               dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
//               rounded-2xl
//               border-l-4 border-orange-400
//               dark:border-orange-500
//               shadow-sm
//               dark:shadow-md
//               font-vazir
//               leading-8 md:leading-10
//               tracking-wide
//               text-gray-800 dark:text-gray-200
//               text-justify
//               overflow-hidden
//               transition-colors duration-300"
//             style={{
//               textShadow: "0 0 1px rgba(0,0,0,0.05)",
//             }}
//           >
//             شرکت تولیدی صنعتی{" "}
//             <span className="font-semibold text-orange-500">
//               میهن یدک گرمسار
//             </span>{" "}
//             اولین و بزرگترین تولید کننده قطعات برقی انواع موتورسیکلت در ایران با
//             بیش از ربع قرن تجربه و بهره گیری از دانش و تخصّص مهندسین توانمند، با
//             استفاده از تجهیزات و امکانات آزمایشگاهی پیشرفته و مشاوره با
//             تعمیرکاران مجرب و خلاق در جای جای ایران عزیز در راستای مشتری مداری،
//             اثر بخشی در ارتقاء کیفیت و رشد صنعت موتورسیکلت ایران به همت پرسنل
//             توانمند خط تولید با مالکیت و مدیریت حاج علی میهن دوست در شهرستان
//             گرمسار استان سمنان فعالیت دارد. شرکت میهن یدک گرمسار مفتخر به کسب{" "}
//             <span className="font-semibold text-orange-500">
//               9 گواهی ثبت اختراع
//             </span>{" "}
//             در صنعت موتور سیکلت میباشد. این شرکت با عزم و اراده ای راسخ همگام با
//             شرکت های بزرگ ایران، همچون ایران خودرو، سایپا و بوتان همراه گشته و
//             پس از انجام تحقیقات گسترده و تعاملات سازنده با سازمان محترم فنی و
//             حرفه ای کل کشور اقدام به آموزش تخصصی و رفع عیوب موتور سیکلتهای جدید
//             به تعمیرکاران در سراسر کشور به صورت علمی نموده است. شرکت میهن یدک با
//             شعار{" "}
//             <span className="font-semibold italic text-orange-500">
//               نامی شناخته شده، کیفیتی به اثبات رسیده
//             </span>{" "}
//             دارنده 9 گواهی ثبت اختراع در صنعت موتورسیکلت ایران در گامی نو با
//             همکاری سازمان آموزش فنی و حرفه ای و اتاق اصناف کشور در راستای ارتقا
//             دانش فنی تعمیرکاران موتورسیکلت با تجهیز بیش از 70 کارگاه آموزش مراکز
//             فنی و حرفه ای شهرستان ها و تدوین استاندارد شایستگی آموزش (آشنایی و
//             عیب یابی تخصّصی برق و الکترونیک و عملکرد سیستم های انژکتور
//             موتورسیکلت های هنداCDI 125و طرح ویو AC و DC) و صدور گواهینامه آموزش
//             مربوطه با بهره گیری از وجود کارشناسان و مدرسین توانمند فنی (مهندسین
//             و تعمیرکاران مجرب) در حال آموزش تعمیرکاران موتورسیکلت کل کشور می
//             باشد. در همین راستا تمامی تعمیرکاران و فروشندگان محصولات با کیفیت
//             میهن یدک در قالب طرح مکانیزه میهن، ساماندهی و عضو خانواده بزرگ شرکت
//             تولیدی صنعتی میهن یدک گرمسار می گردند.
//           </p>
//           {/* Features Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-10">
//             {cards}
//           </div>
//         </div>
//
//         {/* Slogan */}
//         <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 pt-6 md:pt-10 px-4 md:px-6 text-center">
//           <h2 className="text-2xl md:text-4xl font-DimaYekanBold font-extrabold mb-4 md:mb-6 leading-snug border-b border-gray-300 dark:border-gray-700 pb-4 md:pb-5">
//             <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
//               میـهن یـدک
//             </span>
//             ؛ جایی که
//             <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
//               برق
//             </span>
//             بـه حـرکـت مـعـنـی مـی‌ده!
//           </h2>
//           <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
//             انتخابی مطمئن برای کسانی که کیفیت، پشتیبانی و دوام را در کنار هم
//             می‌خواهند.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// });
//
// export default HeroSectionAbout;


import React, {memo, useMemo} from "react";
import Head from "next/head";
import {
    BadgeCheck,
    Users,
    Wrench,
    Lightbulb,
    ShieldCheck,
    School,
} from "lucide-react";
import {useLocale} from "../../../lib/localeContext";

const iconMap = {
    BadgeCheck,
    Users,
    Wrench,
    Lightbulb,
    ShieldCheck,
    School,
};

const FeatureCard = memo(function FeatureCard({Icon, title, description}) {
    return (
        <div
            className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-orange-200 p-4 md:p-6 text-center border border-gray-100 dark:border-gray-700 w-full transition-shadow duration-300">
            <div className="flex justify-center mb-3 md:mb-4">
                <div className="bg-gradient-to-tr from-orange-100 to-orange-200 rounded-full p-2 md:p-3">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-500"/>
                </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-orange-500 my-3 md:my-5">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
});

const HeroSectionAbout = memo(function HeroSectionAbout({
                                                            description,
                                                            keywords,
                                                        }) {
    const {t} = useLocale();

    const features = t("about.features", {returnObjects: true}) || [];

    const cards = useMemo(
        () =>
            features.map(({icon, title, description}, idx) => {
                const IconComponent = iconMap[icon] || (() => null);
                return (
                    <FeatureCard
                        key={`${title}-${idx}`}
                        Icon={IconComponent}
                        title={title}
                        description={description}
                    />
                );
            }),
        [features]
    );

    return (
        <>
            <Head>
                {description && <meta name="description" content={description}/>}
                {keywords && <meta name="keywords" content={keywords}/>}
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
            </Head>

            <section
                className="bg-gray-50 py-20 md:py-40 dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-4 md:px-16 font-vazir">
                {/* Intro */}
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="mt-5 font-IranNastaliq text-3xl md:text-5xl font-extrabold text-orange-500 mb-6 leading-tight">
                        {t("about.hero.title")}
                    </h1>

                    <p
                        className="max-w-6xl mx-auto p-6 md:p-12
              bg-gradient-to-br from-orange-50 via-white to-orange-100
              dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
              rounded-2xl
              border-l-4 border-orange-400
              dark:border-orange-500
              shadow-sm
              dark:shadow-md
              font-vazir
              leading-8 md:leading-10
              tracking-wide
              text-gray-800 dark:text-gray-200
              text-justify
              overflow-hidden
              transition-colors duration-300"
                        style={{
                            textShadow: "0 0 1px rgba(0,0,0,0.05)",
                        }}
                        dangerouslySetInnerHTML={{__html: t("about.hero.description")}}
                    />

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-10">
                        {cards}
                    </div>
                </div>

                {/* Slogan */}
                <div
                    className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 pt-6 md:pt-10 px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-DimaYekanBold font-extrabold mb-4 md:mb-6 leading-snug border-b border-gray-300 dark:border-gray-700 pb-4 md:pb-5">
            <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
              {t("about.slogan.part1")}
            </span>
                        {t("about.slogan.part2")}
                        <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
              {t("about.slogan.part3")}
            </span>
                        {t("about.slogan.part4")}
                    </h2>
                    <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                        {t("about.slogan.subtitle")}
                    </p>
                </div>
            </section>
        </>
    );
});

export default HeroSectionAbout;