// import { FaHeadset, FaFlask, FaGem, FaIndustry, FaAward } from "react-icons/fa";
//
// const features = [
//   {
//     icon: <FaHeadset className="text-3xl text-orange-500" />,
//     title: "ارتباط با مشتری",
//     desc: "پشتیبانی حرفه‌ای و خدمات پس از فروش",
//   },
//   {
//     icon: <FaFlask className="text-3xl text-yellow-500" />,
//     title: "تحقیق و توسعه",
//     desc: "استفاده از تکنولوژی روز دنیا",
//   },
//   {
//     icon: <FaGem className="text-3xl text-pink-500" />,
//     title: "مواد اولیه ممتاز",
//     desc: "بهره‌گیری از باکیفیت‌ترین مواد اولیه",
//   },
// ];
//
// const achievements = [
//   { value: "۳۰ +", label: "سال تجربه" },
//   { value: "۵۰۰+", label: "مشتری ثابت" },
//   { value: "۱۰۰%", label: "رضایت مشتری" },
//   { value: "۲۴/۷", label: "پشتیبانی" },
// ];
//
// const CompanyProfile = () => {
//   return (
//     <section className=" min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 md:px-20 py-20 mx-auto">
//       <div className="text-center mb-16">
//         <FaIndustry className="text-5xl text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
//         <h1 className="font-DimaYekanBold text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
//           شرکت میهن یدک گرمسار
//         </h1>
//         <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
//           با پرسنل مجرب، تولید با کیفیت و استفاده از بهترین مواد اولیه در راستای
//           رضایت مصرف‌کنندگان.
//         </p>
//       </div>
//
//       {/* Features */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
//         {features.map(({ icon, title, desc }, i) => (
//           <div
//             key={i}
//             className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 dark:bg-orange-700 rounded-full">
//               {icon}
//             </div>
//             <h3 className="text-xl font-semibold mb-2">{title}</h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
//           </div>
//         ))}
//       </div>
//
//       {/* Achievements */}
//       <div className="bg-white mb-20 dark:bg-gray-800 rounded-2xl shadow-md p-10 border border-gray-200 dark:border-gray-700">
//         <div className="text-center mb-8">
//           <FaAward className="text-4xl text-orange-500 mb-2 mx-auto" />
//           <h2 className="text-2xl font-bold text-orange-500 dark:text-white">
//             دستاوردها و افتخارات
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {achievements.map(({ value, label }, i) => (
//             <div
//               key={i}
//               className=" bg-orange-50 dark:bg-orange-700 rounded-xl p-6 text-center border border-orange-200 dark:border-orange-500"
//             >
//               <div className="text-2xl font-extrabold text-orange-500 dark:text-gray-50 mb-2">
//                 {value}
//               </div>
//               <div className="text-sm text-gray-700 dark:text-gray-200">
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
//
// export default CompanyProfile;


import {FaHeadset, FaFlask, FaGem, FaIndustry, FaAward} from "react-icons/fa";
import {useLocale} from "../../../lib/localeContext";

const CompanyProfile = () => {
    const {t} = useLocale();

    const features = [
        {
            icon: <FaHeadset className="text-3xl text-orange-500"/>,
            titleKey: "companyProfile.features.feature1.title",
            descKey: "companyProfile.features.feature1.desc",
        },
        {
            icon: <FaFlask className="text-3xl text-yellow-500"/>,
            titleKey: "companyProfile.features.feature2.title",
            descKey: "companyProfile.features.feature2.desc",
        },
        {
            icon: <FaGem className="text-3xl text-pink-500"/>,
            titleKey: "companyProfile.features.feature3.title",
            descKey: "companyProfile.features.feature3.desc",
        },
    ];

    const achievements = [
        {
            valueKey: "companyProfile.achievements.ach1.value",
            labelKey: "companyProfile.achievements.ach1.label",
        },
        {
            valueKey: "companyProfile.achievements.ach2.value",
            labelKey: "companyProfile.achievements.ach2.label",
        },
        {
            valueKey: "companyProfile.achievements.ach3.value",
            labelKey: "companyProfile.achievements.ach3.label",
        },
        {
            valueKey: "companyProfile.achievements.ach4.value",
            labelKey: "companyProfile.achievements.ach4.label",
        },
    ];

    return (
        <section
            className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 md:px-20 py-20 mx-auto"
            aria-label={t("companyProfile.schemaName")}
        >
            <div className="text-center mb-16">
                <FaIndustry className="text-5xl text-orange-500 dark:text-orange-400 mb-4 mx-auto"/>
                <h1 className="font-DimaYekanBold text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    {t("companyProfile.title")}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                    {t("companyProfile.description")}
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
                {features.map(({icon, titleKey, descKey}, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center"
                    >
                        <div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 dark:bg-orange-700 rounded-full">
                            {icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {t(titleKey)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {t(descKey)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <div
                className="bg-white mb-20 dark:bg-gray-800 rounded-2xl shadow-md p-10 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                    <FaAward className="text-4xl text-orange-500 mb-2 mx-auto"/>
                    <h2 className="text-2xl font-bold text-orange-500 dark:text-white">
                        {t("companyProfile.schemaName")}
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {achievements.map(({valueKey, labelKey}, i) => (
                        <div
                            key={i}
                            className="bg-orange-50 dark:bg-orange-700 rounded-xl p-6 text-center border border-orange-200 dark:border-orange-500"
                        >
                            <div className="text-2xl font-extrabold text-orange-500 dark:text-gray-50 mb-2">
                                {t(valueKey)}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-200">
                                {t(labelKey)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyProfile;
