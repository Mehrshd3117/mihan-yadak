// import {
//     Briefcase,
//     Award,
//     Users,
//     ZoomIn,
//     ZoomOut,
//     RefreshCw,
//     X,
// } from "lucide-react";
// import Image from "next/image";
// import {useState, useEffect, useCallback} from "react";
// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
//
// const iconMap = {
//     Briefcase: (
//         <Briefcase className="w-8 h-8 text-orange-500 dark:text-orange-400"/>
//     ),
//     Award: <Award className="w-8 h-8 text-orange-500 dark:text-orange-400"/>,
//     Users: <Users className="w-8 h-8 text-orange-500 dark:text-orange-400"/>,
// };
//
// const CollaborationSection = () => {
//     const [selectedIndex, setSelectedIndex] = useState(null);
//
//     const openModal = useCallback((index) => {
//         setSelectedIndex(index);
//         document.body.style.overflow = "hidden";
//     }, []);
//
//     const closeModal = useCallback(() => {
//         setSelectedIndex(null);
//         document.body.style.overflow = "auto";
//     }, []);
//
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === "Escape") {
//                 closeModal();
//             }
//         };
//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [closeModal]);
//     const collaborationGallery = [
//         {
//             imgSrc: "/images/collaboration/technical-degree-1.webp",
//             alt: "تفاهم-نامه-فنی-حرفه-ای-1",
//         },
//         {
//             imgSrc: "/images/collaboration/technical-degree-2.webp",
//             alt: "تفاهم-نامه-فنی-حرفه-ای-2",
//         },
//         {
//             imgSrc: "/images/collaboration/technical-degree-3.webp",
//             alt: "تفاهم-نامه-فنی-حرفه-ای-3",
//         },
//         {
//             imgSrc: "/images/collaboration/technical-degree-4.webp",
//             alt: "تفاهم-نامه-فنی-حرفه-ای-4",
//         },
//     ];
//     const collaborationFeatures = [
//         {
//             icon: "Briefcase",
//             title: "تجربه کاری",
//             description:
//                 "همکاری با سازمان معتبر فنی و حرفه‌ای ایران، گامی بزرگ در مسیر رشد ماست.",
//         },
//         {
//             icon: "Award",
//             title: "اعتبار و افتخار",
//             description:
//                 "این همکاری نشان‌دهنده کیفیت و تعهد ما در ارائه خدمات تخصصی است.",
//         },
//         {
//             icon: "Users",
//             title: "همکاری جمعی",
//             description: "ما با تیمی حرفه‌ای و متخصص از فنی حرفه‌ای همراه هستیم.",
//         },
//     ];
//
//
//     const selectedImage = selectedIndex !== null ? collaborationGallery[selectedIndex] : null;
//
//     // جلوگیری از رندرهای اضافه‌ی آیکون
//     const renderIcon = useCallback((iconName) => iconMap[iconName] ?? iconMap["Briefcase"], []);
//
//     // Prevent focus scroll on modal open by managing focus properly
//     useEffect(() => {
//         if (selectedIndex !== null) {
//             const focusedElement = document.activeElement;
//             const modal = document.getElementById("collaboration-modal");
//             if (modal) {
//                 modal.focus();
//             }
//             return () => {
//                 if (focusedElement) focusedElement.focus();
//             };
//         }
//     }, [selectedIndex]);
//
//
//     return (
//         <section className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white py-16 px-6 md:px-20">
//             <div className="max-w-6xl mx-auto text-center">
//                 <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold mb-6 text-orange-600 dark:text-orange-400">
//                     افتخار همکاری با سازمان فنی و حرفه‌ای ایران
//                 </h2>
//
//                 <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-300">
//                     این همکاری گواهی بر تعهد ما به کیفیت، آموزش و توسعه مهارت‌هاست.
//                 </p>
//
//                 <div className="grid md:grid-cols-3 gap-8 mb-12">
//                     {collaborationFeatures?.map(({icon, title, description}, index) => (
//                         <div
//                             key={index}
//                             className="bg-white dark:bg-[#112240] p-6 rounded-2xl shadow-lg hover:shadow-orange-300/50 dark:hover:shadow-orange-400/40 transition-shadow"
//                             tabIndex={0}
//                             aria-label={`${title} - ${description}`}
//                         >
//                             <div className="mb-4">{renderIcon(icon)}</div>
//                             <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
//                             <p className="text-gray-500 dark:text-gray-300 text-sm">{description}</p>
//                         </div>
//                     ))}
//                 </div>
//
// <div className="mt-8 flex justify-center">
//     <Image
//         src="/Collaboration/collaboration.webp"
//         alt="لوگوی فنی و حرفه‌ای ایران"
//         width={400}
//         height={200}
//         className="object-contain"
//         priority={true} // preload چون تصویر اصلیه
//         loading="eager"
//     />
// </div>
//
//                 <div className="mt-16">
//                     <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-6">
//                         تفاهم نامه بین شرکت میهن یدک گرمسار و سازمان فنی و حرفه ای ایران
//                     </h3>
//
//                     <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
//                         {collaborationGallery?.map(({imgSrc, alt}, index) => (
//                             <div
//                                 key={index}
//                                 className="relative group overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform duration-300 cursor-pointer"
//                                 onClick={() => openModal(index)}
//                                 role="button"
//                                 tabIndex={0}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter" || e.key === " ") {
//                                         e.preventDefault();
//                                         openModal(index);
//                                     }
//                                 }}
//                                 aria-label={`مشاهده تصویر ${alt}`}
//                             >
//                                 <Image
//                                     src={imgSrc}
//                                     alt={alt}
//                                     width={200}
//                                     height={150}
//                                     className="w-full h-auto object-cover group-hover:opacity-75 transition-opacity"
//                                     loading="lazy"
//                                     placeholder="blur"
//                                     blurDataURL="/placeholder.png" // می‌تونی یک تصویر کم حجم شفاف بذاری برای placeholder
//                                 />
//                                 <div
//                                     className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <p className="text-white font-medium text-sm text-center px-2">
//                                         برای مشاهده جزییات کلیک نمایید
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//
//                     {selectedImage && (
//                         <div
//                             id="collaboration-modal"
//                             tabIndex={-1}
//                             className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4"
//                             onClick={closeModal}
//                             role="dialog"
//                             aria-modal="true"
//                             aria-label="نمایش تصویر بزرگ"
//                         >
//                             <div
//                                 className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center overflow-hidden rounded-xl"
//                                 onClick={(e) => e.stopPropagation()}
//                             >
//                                 <TransformWrapper
//                                     initialScale={1}
//                                     minScale={0.5}
//                                     maxScale={3}
//                                     wheel={{step: 50}}
//                                     doubleClick={{disabled: true}}
//                                     pinch={{step: 5}}
//                                     panning={{velocityDisabled: true}}
//                                 >
//                                     {({zoomIn, zoomOut, resetTransform}) => (
//                                         <>
//                                             <TransformComponent
//                                                 wrapperStyle={{
//                                                     maxHeight: "90vh",
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                 }}
//                                                 contentStyle={{touchAction: "none"}}
//                                             >
//                                                 <Image
//                                                     src={selectedImage.imgSrc}
//                                                     alt={selectedImage.alt}
//                                                     width={1200}
//                                                     height={800}
//                                                     className="object-contain max-h-[90vh] rounded-xl"
//                                                     loading="eager" // چون در مودال نمایش داده می‌شود
//                                                     priority={true}
//                                                 />
//                                             </TransformComponent>
//
//                                             <div
//                                                 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-gray-800/70 rounded-full p-2 z-50">
//                                                 <button
//                                                     type="button"
//                                                     className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         zoomIn();
//                                                     }}
//                                                     aria-label="بزرگنمایی"
//                                                 >
//                                                     <ZoomIn className="w-5 h-5"/>
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         zoomOut();
//                                                     }}
//                                                     aria-label="کوچک‌نمایی"
//                                                 >
//                                                     <ZoomOut className="w-5 h-5"/>
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         resetTransform();
//                                                     }}
//                                                     aria-label="بازنشانی زوم"
//                                                 >
//                                                     <RefreshCw className="w-5 h-5"/>
//                                                 </button>
//                                             </div>
//                                         </>
//                                     )}
//                                 </TransformWrapper>
//
//                                 <button
//                                     type="button"
//                                     className="absolute top-4 right-4 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700 transition-all z-50"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         closeModal();
//                                     }}
//                                     aria-label="بستن مودال"
//                                 >
//                                     <X className="w-6 h-6"/>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default CollaborationSection;


// components/CollaborationSection.jsx

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "../../../lib/localeContext";
import {
    Briefcase,
    Award,
    Users,
    ZoomIn,
    ZoomOut,
    RefreshCw,
    X,
} from "lucide-react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const iconMap = {
    Briefcase: <Briefcase className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
    Award: <Award className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
    Users: <Users className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
};

const CollaborationSection = () => {
    const { t } = useLocale();
    const {
        title,
        subTitle,
        features,
        gallery: { hint, images, modal },
    } = t("collaboration");

    const [selectedIndex, setSelectedIndex] = useState(null);

    const openModal = useCallback((index) => {ب
        setSelectedIndex(index);
        document.body.style.overflow = "hidden";
    }, []);

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
        document.body.style.overflow = "auto";
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeModal]);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    const renderIcon = useCallback(
        (iconName) => iconMap[iconName] ?? iconMap["Briefcase"],
        []
    );

    // Prevent focus scroll on modal open by managing focus properly
    useEffect(() => {
        if (selectedIndex !== null) {
            const focusedElement = document.activeElement;
            const modalEl = document.getElementById("collaboration-modal");
            if (modalEl) modalEl.focus();
            return () => {
                if (focusedElement) focusedElement.focus();
            };
        }
    }, [selectedIndex]);

    return (
        <section className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white py-16 px-6 md:px-20">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold mb-6 text-orange-600 dark:text-orange-400">
                    {title}
                </h2>
                <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-300">
                    {subTitle}
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {features.map(({ icon, title, description }, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#112240] p-6 rounded-2xl shadow-lg hover:shadow-orange-300/50 dark:hover:shadow-orange-400/40 transition-shadow"
                            tabIndex={0}
                            aria-label={`${title} - ${description}`}
                        >
                            <div className="mb-4">{renderIcon(icon)}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                {title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                    <Image
                        src="/Collaboration/collaboration.webp"
                        alt="لوگوی فنی و حرفه‌ای ایران"
                        width={400}
                        height={200}
                        className="object-contain"
                        priority={true} // preload چون تصویر اصلیه
                        loading="eager"
                    />
                </div>
                <div className="mt-16">
            

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map(({ src, alt }, index) => (
                            <div
                                key={index}
                                className="relative group overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => openModal(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        openModal(index);
                                    }
                                }}
                                aria-label={alt}
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={200}
                                    height={150}
                                    className="w-full h-auto object-cover group-hover:opacity-75 transition-opacity"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="/placeholder.png"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-medium text-sm text-center px-2">
                                        {hint}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedImage && (
                        <div
                            id="collaboration-modal"
                            tabIndex={-1}
                            className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4"
                            onClick={closeModal}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div
                                className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center overflow-hidden rounded-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TransformWrapper
                                    initialScale={1}
                                    minScale={0.5}
                                    maxScale={3}
                                    wheel={{ step: 50 }}
                                    doubleClick={{ disabled: true }}
                                    pinch={{ step: 5 }}
                                    panning={{ velocityDisabled: true }}
                                >
                                    {({ zoomIn, zoomOut, resetTransform }) => (
                                        <>
                                            <TransformComponent
                                                wrapperStyle={{
                                                    maxHeight: "90vh",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                contentStyle={{ touchAction: "none" }}
                                            >
                                                <Image
                                                    src={selectedImage.src}
                                                    alt={selectedImage.alt}
                                                    width={1200}
                                                    height={800}
                                                    className="object-contain max-h-[90vh] rounded-xl"
                                                    loading="eager"
                                                    priority
                                                />
                                            </TransformComponent>

                                            <div
                                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-gray-800/70 rounded-full p-2 z-50">
                                                <button
                                                    type="button"
                                                    className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        zoomIn();
                                                    }}
                                                    aria-label={modal.buttons.zoomIn}
                                                >
                                                    <ZoomIn className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        zoomOut();
                                                    }}
                                                    aria-label={modal.buttons.zoomOut}
                                                >
                                                    <ZoomOut className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-white p-2 rounded-full hover:bg-gray-700 transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        resetTransform();
                                                    }}
                                                    aria-label={modal.buttons.resetZoom}
                                                >
                                                    <RefreshCw className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </TransformWrapper>

                                <button
                                    type="button"
                                    className="absolute top-4 right-4 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700 transition-all z-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeModal();
                                    }}
                                    aria-label={modal.buttons.close}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CollaborationSection;
