// import { memo } from "react";
// import steps from "../../../public/lib/steps";
// const ProcessSteps = () => (
//   <div className="w-full bg-gray-50 dark:bg-slate-900 dark:text-white">
//     <section className="w-full  bg-orange-400 text-white py-20 px-6 text-center ">
//       <h1 className="text-4xl md:text-5xl font-DimaYekanBold font-extrabold mb-6 leading-snug border-b border-white pb-5">
//         <span className="text-5xl md:tetx-6xl text-slate-800   ">
//           میهن یدک گرمسار ؛
//         </span>
//         اعتماد صنعت، انتخاب حرفه‌ای‌ها !
//       </h1>
//       <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
//          نشان‌دهنده اعتبار و جایگاه در بازار و بین تولیدکنندگان و فروشندگان.
//       </p>
//     </section>
//     <section className="w-[95%] mx-auto py-24 px-6 text-center">
//       <h2 className="font-DimaYekanBold text-4xl sm:text-5xl mt-10 mb-4 font-bold text-orange-600 dark:text-orange-400">
//         فرآیند تولید محصولات در میهن یدک
//       </h2>
//       <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-300 mb-14">
//         مراحل انجام تولید قطعه در میهن یدک گرمسار
//       </p>
//
//       <div className="relative w-full">
//         <svg
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//           className="hidden md:block absolute top-20 left-0 w-full h-10 z-0"
//         >
//           <path
//             d="M0,60 C150,0 150,120 300,60 S450,0 600,60 750,120 900,60 1050,0 1200,60"
//             fill="none"
//             stroke="#302e2e"
//             className="dark:stroke-gray-300"
//             strokeWidth="2"
//             strokeDasharray="6 8"
//           />
//         </svg>
//
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
//           {steps.map(({ icon, title, description }, index) => (
//             <div
//               key={index}
//               className="flex flex-row md:flex-col items-center md:text-center w-full md:w-auto relative"
//             >
//               {index !== steps.length - 1 && (
//                 <div className="block md:hidden absolute top-[4.5rem] right-[2rem] h-[60px] w-[1px] border-r-2 border-dashed border-gray-400 dark:border-gray-300 z-[-1]" />
//               )}
//
//               <div className="flex items-center justify-center text-xl md:w-16 md:h-16 w-14 h-14 rounded-full bg-orange-100 dark:bg-white/20 shadow-md backdrop-blur-md shrink-0">
//                 {icon}
//               </div>
//
//               <div className="mr-4 md:mr-0 text-right md:text-center md:mt-10">
//                 <h3 className="font-semibold text-lg text-black dark:text-orange-100 mt-1 mb-1 md:mt-5">
//                   {title}
//                 </h3>
//                 <p className="text-md text-gray-600 dark:text-gray-400 max-w-[180px]">
//                   {description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   </div>
// );
//
// export default memo(ProcessSteps);


// components/ProcessSteps.jsx
import {memo} from "react";
import steps from "../../../public/lib/steps"; // این آرایه حاوی آیکون‌ها و بقیۀ داده‌هاست
import {useLocale} from "../../../lib/localeContext";

const ProcessSteps = () => {
    const {t} = useLocale();

    // ترجمهٔ hero
    const heroBrand = t("processSteps.hero.brand");
    const heroTagline = t("processSteps.hero.tagline");
    const heroSubtitle = t("processSteps.hero.subtitle");

    // ترجمهٔ بخش میانی
    const sectionTitle = t("processSteps.section.title");
    const sectionDesc = t("processSteps.section.description");

    // ترکیب داده‌های اصلی (برای آیکون) با ترجمهٔ عناوین و توضیحات
    const translatedSteps = steps.map((step, index) => ({
        icon: step.icon,
        title: t(`processSteps.steps.${index}.title`),
        description: t(`processSteps.steps.${index}.description`),
    }));

    return (
        <div className="w-full bg-gray-50 dark:bg-slate-900 dark:text-white">
            {/* Hero */}
            <section className="w-full bg-orange-400 text-white py-20 px-6 text-center ">
                <h1 className="text-4xl md:text-5xl font-DimaYekanBold font-extrabold mb-6 leading-snug border-b border-white pb-5">
          <span className="text-5xl md:tetx-6xl text-slate-800">
            {heroBrand}
          </span>
                    {heroTagline}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
                    {heroSubtitle}
                </p>
            </section>

            {/* Process Section */}
            <section className="w-[95%] mx-auto py-24 px-6 text-center">
                <h2 className="font-DimaYekanBold text-4xl sm:text-5xl mt-10 mb-4 font-bold text-orange-600 dark:text-orange-400">
                    {sectionTitle}
                </h2>
                <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-300 mb-14">
                    {sectionDesc}
                </p>

                <div className="relative w-full">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="hidden md:block absolute top-20 left-0 w-full h-10 z-0"
                    >
                        <path
                            d="M0,60 C150,0 150,120 300,60 S450,0 600,60 750,120 900,60 1050,0 1200,60"
                            fill="none"
                            stroke="#302e2e"
                            className="dark:stroke-gray-300"
                            strokeWidth="2"
                            strokeDasharray="6 8"
                        />
                    </svg>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                        {translatedSteps.map(({icon, title, description}, index) => (
                            <div
                                key={index}
                                className="flex flex-row md:flex-col items-center md:text-center w-full md:w-auto relative"
                            >
                                {index !== translatedSteps.length - 1 && (
                                    <div
                                        className="block md:hidden absolute top-[4.5rem] right-[2rem] h-[60px] w-[1px] border-r-2 border-dashed border-gray-400 dark:border-gray-300 z-[-1]"/>
                                )}

                                <div
                                    className="flex items-center justify-center text-xl md:w-16 md:h-16 w-14 h-14 rounded-full bg-orange-100 dark:bg-white/20 shadow-md backdrop-blur-md shrink-0">
                                    {icon}
                                </div>

                                <div className="mr-4 md:mr-0 text-right md:text-center md:mt-10">
                                    <h3 className="font-semibold text-lg text-black dark:text-orange-100 mt-1 mb-1 md:mt-5">
                                        {title}
                                    </h3>
                                    <p className="text-md text-gray-600 dark:text-gray-400 max-w-[180px]">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(ProcessSteps);
