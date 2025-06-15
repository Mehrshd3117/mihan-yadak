// import React from "react";
// import Image from "next/image";
//
// const teamMembers = [
//   {
//     name: "حاج علی میهن‌دوست",
//     position: "مدیرعامل",
//     description:
//       "با دیدی کلان و مدیریتی راهبردی، مسئول هدایت و سیاست‌گذاری کلان مجموعه.",
//     image: "/images/partner/ali-mihandost.webp",
//   },
//   {
//     name: "جواد میهن‌دوست",
//     position: "مدیر بازرگانی",
//     description:
//       "متخصص توسعه بازار و ارتباطات تجاری، مسئول گسترش تعاملات داخلی و خارجی.",
//     image: "/images/partner/javad-mihandost.webp",
//   },
//   {
//     name: "محمد میهن‌دوست",
//     position: "مدیر کارخانه",
//     description:
//       "ناظر مستقیم تولید و کیفیت، مسئول بهینه‌سازی فرآیندها و تضمین استاندارد محصولات.",
//     image: "/images/partner/mohammad-mihandost.webp",
//   },
// ];
//
// const ManagementTeam = () => {
//   return (
//     <section className="py-12 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold text-orange-500 dark:text-amber-500 mb-4">
//             هیئت مدیره میهن یدک
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-blue-100 max-w-3xl mx-auto leading-relaxed">
//             رهبری مجموعه میهن یدک بر عهده سه مدیر متعهد و متخصص است که با دانش،
//             تجربه و رویکردی آینده‌نگر، مسیر رشد و تعالی این برند را هدایت
//             می‌کنند.
//           </p>
//         </div>
//
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map(({ name, position, description, image }, i) => (
//             <article
//               key={i}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               tabIndex={0} // برای دسترس‌پذیری بهتر
//             >
//               <div className="relative h-64 w-full">
//                 <Image
//                   src={image}
//                   alt={name}
//                   fill
//                   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   className="rounded-t-xl object-cover"
//                   priority={i === 0} // اولی رو اولویت لود بده
//                   loading={i === 0 ? "eager" : "lazy"}
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                   {name}
//                 </h3>
//                 <p className="text-lg text-orange-500 dark:text-yellow-400 mb-4">
//                   {position}
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//
//         <div className="mt-12 text-center">
//           <p className="text-gray-600 dark:text-blue-100 text-lg max-w-3xl mx-auto">
//             ترکیب تجربه، تعهد و تخصص این تیم، ضامن پیشرفت پایدار و رضایت مشتریان
//             میهن یدک است.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };
//
// export default ManagementTeam;


// components/ManagementTeam.jsx
import React from "react";
import Image from "next/image";
import {useLocale} from "../../../lib/localeContext";

const ManagementTeam = () => {
    const {t} = useLocale();
    const title = t("managementTeam.title");
    const description = t("managementTeam.description");
    const teamMembers = t("managementTeam.members") || [];
    const bottomDesc = t("managementTeam.bottomDescription");

    return (
        <section className="py-12 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold text-orange-500 dark:text-amber-500 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map(({name, position, description, image}, i) => (
                        <article
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            tabIndex={0}
                        >
                            <div className="relative h-64 w-full">
                                <Image
                                    src={image}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="rounded-t-xl object-cover"
                                    priority={i === 0}
                                    loading={i === 0 ? "eager" : "lazy"}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                    {name}
                                </h3>
                                <p className="text-lg text-orange-500 dark:text-yellow-400 mb-4">
                                    {position}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-blue-100 text-lg max-w-3xl mx-auto">
                        {bottomDesc}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ManagementTeam;
