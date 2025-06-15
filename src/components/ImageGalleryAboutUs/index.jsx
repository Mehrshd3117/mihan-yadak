// import {useEffect, useState, useRef} from "react";
// import {useRouter} from "next/router";
// import {motion, AnimatePresence} from "framer-motion";
// import {ChevronLeft, ChevronRight, ZoomIn, RefreshCcw} from "lucide-react";
// import Image from "next/image";
// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
//
// const CloseIcon = ({className = ""}) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className={`w-6 h-6 ${className}`}
//     >
//         <line x1="18" y1="6" x2="6" y2="18"/>
//         <line x1="6" y1="6" x2="18" y2="18"/>
//     </svg>
// );
// const imagesBySection = {
//     "نمایشگاه سال 1403": [
//         "/images/exhibition/03/403-exhibition-1.webp",
//         "/images/exhibition/03/403-exhibition-2.webp",
//         "/images/exhibition/03/403-exhibition-3.webp",
//         "/images/exhibition/03/403-exhibition-4.webp",
//     ],
//     "نمایشگاه سال 1396": [
//         "/images/exhibition/96/96-exhibition-1.webp",
//         "/images/exhibition/96/96-exhibition-2.webp",
//         "/images/exhibition/96/96-exhibition-3.webp",
//         "/images/exhibition/96/96-exhibition-4.webp",
//     ],
//     "نمایشگاه سال 1395": [
//         "/images/exhibition/95/95-exhibition-(1).webp",
//         "/images/exhibition/95/95-exhibition-(2).webp",
//         "/images/exhibition/95/95-exhibition-(3).webp",
//         "/images/exhibition/95/95-exhibition-(4).webp",
//     ],
//     "نمایشگاه اصفهان": [
//         "/images/exhibition/isfahan/isfahan-exhibition-1.webp",
//         "/images/exhibition/isfahan/isfahan-exhibition-2.webp",
//         "/images/exhibition/isfahan/isfahan-exhibition-3.webp",
//         "/images/exhibition/isfahan/isfahan-exhibition-4.webp",
//     ],
// };
//
// const ImageGalleryAboutUs = ({
//                                  imageGalleryTitle,
//                                  imageGallerySubTitle,
//                              }) => {
//     const router = useRouter();
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [imageIndex, setImageIndex] = useState(null);
//     const transformWrapperRef = useRef(null);
//
//     const allImages = Object.values(imagesBySection).flat();
//
//     useEffect(() => {
//         const name = router.query.image
//             ? decodeURIComponent(router.query.image)
//             : null;
//         const idx = name ? allImages.indexOf(name) : -1;
//         if (idx !== -1) {
//             setSelectedImage(name);
//             setImageIndex(idx);
//         } else {
//             setSelectedImage(null);
//             setImageIndex(null);
//         }
//     }, [router.query.image]);
//
//     useEffect(() => {
//         const handleKey = (e) => {
//             if (e.key === "Escape") closeImage();
//             if (e.key === "ArrowRight") nextImage();
//             if (e.key === "ArrowLeft") prevImage();
//         };
//         document.body.style.overflow = selectedImage ? "hidden" : "auto";
//         window.addEventListener("keydown", handleKey);
//         return () => {
//             window.removeEventListener("keydown", handleKey);
//             document.body.style.overflow = "auto";
//         };
//     }, [selectedImage]);
//
//     const openImage = (src, index) => {
//         const name = encodeURIComponent(src);
//         const basePath = router.asPath.split("?")[0];
//         router.push(`${basePath}?image=${name}`, undefined, {shallow: true});
//         setImageIndex(index);
//     };
//
//     const closeImage = () => {
//         router.replace(router.asPath.split("?")[0], undefined, {shallow: true});
//     };
//
//     const nextImage = () => {
//         if (imageIndex < allImages.length - 1) {
//             openImage(allImages[imageIndex + 1], imageIndex + 1);
//         }
//     };
//
//     const prevImage = () => {
//         if (imageIndex > 0) {
//             openImage(allImages[imageIndex - 1], imageIndex - 1);
//         }
//     };
//
//     const handleReset = () => {
//         transformWrapperRef.current?.resetTransform();
//     };
//
//
//     return (
//         <section
//             className="relative bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-20 px-6 md:px-20 overflow-hidden text-black dark:text-white">
//             <motion.div
//                 initial={{opacity: 0, y: 50}}
//                 whileInView={{opacity: 1, y: 0}}
//                 transition={{duration: 0.8}}
//                 viewport={{once: true}}
//                 className="text-center mb-16"
//             >
//                 <h2 className="text-4xl font-IranNastaliq md:text-5xl font-extrabold text-orange-500 dark:text-orange-400 mb-4 drop-shadow-md">
//                     {imageGalleryTitle}
//                 </h2>
//                 <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
//                     {imageGallerySubTitle}
//                 </p>
//             </motion.div>
//
//             {Object.entries(imagesBySection).map(
//                 ([sectionTitle, imageNames], sectionIdx) => {
//                     const baseIndex = Object.values(imagesBySection)
//                         .slice(0, sectionIdx)
//                         .flat().length;
//
//                     return (
//                         <div key={sectionTitle} className="mb-16">
//                             <h3
//                                 className={`text-2xl font-extrabold mb-12 text-center max-w-md mx-auto rounded-xl py-3 px-8 select-none
//  transition-colors duration-300 bg-orange-50 border-2 border-orange-30 text-orange-700 shadow-lg dark:bg-slate-800
// dark:border-orange-600 dark:text-orange-400 dark:shadow-[0_4px_8px_rgba(255,140,0,0.3)]
// `}
//                             >
//                                 {sectionTitle}
//                             </h3>
//
//                             <div
//                                 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-[1700px] mx-auto">
//                                 {imageNames.map((name, idx) => {
//                                     const fullSrc = name;
//                                     const flatIndex = baseIndex + idx;
//
//                                     return (
//                                         <motion.div
//                                             key={fullSrc}
//                                             onClick={() => openImage(fullSrc, flatIndex)}
//                                             className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition max-w-[320px] w-full"
//                                             initial={{opacity: 0, scale: 0.95}}
//                                             whileInView={{opacity: 1, scale: 1}}
//                                             transition={{duration: 0.4, delay: idx * 0.05}}
//                                             viewport={{once: true}}
//                                         >
//                                             <div className="relative w-full aspect-square">
//                                                 <Image
//                                                     src={fullSrc}
//                                                     alt={`تصویر ${flatIndex + 1}`}
//                                                     fill
//                                                     className="object-cover  rounded-2xl transition-transform duration-700 group-hover:scale-110"
//                                                     loading="lazy"
//                                                 />
//                                                 <div
//                                                     className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition rounded-2xl"/>
//                                                 <div
//                                                     className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-sm font-semibold backdrop-blur-sm bg-black/30 rounded-2xl">
//                                                     برای بزرگنمایی کلیک نمایید
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     );
//                 }
//             )}
//
//             <AnimatePresence>
//                 {selectedImage && (
//                     <motion.div
//                         className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
//                         initial={{opacity: 0}}
//                         animate={{opacity: 1}}
//                         exit={{opacity: 0}}
//                     >
//                         <motion.div
//                             initial={{scale: 0.9}}
//                             animate={{scale: 1}}
//                             transition={{duration: 0.3}}
//                             className="relative w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4"
//                         >
//                             {imageIndex > 0 && (
//                                 <button
//                                     onClick={prevImage}
//                                     className="text-white hover:text-orange-300 sm:absolute sm:left-4 z-20"
//                                 >
//                                     <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12"/>
//                                 </button>
//                             )}
//
//                             <div className="relative w-full flex items-center justify-center">
//                                 <TransformWrapper
//                                     ref={transformWrapperRef}
//                                     initialScale={1}
//                                     minScale={0.8}
//                                     maxScale={4}
//                                     doubleClick={{disabled: true}}
//                                 >
//                                     <TransformComponent wrapperClass="w-full flex items-center justify-center">
//                                         <Image
//                                             src={selectedImage}
//                                             alt="بزرگنمایی تصویر"
//                                             width={1000}
//                                             height={800}
//                                             className="rounded-xl shadow-2xl border-4 border-orange-300 dark:border-orange-400 max-h-[80vh] w-full sm:w-auto object-contain"
//                                             priority
//                                         />
//                                     </TransformComponent>
//                                 </TransformWrapper>
//
//                                 <div className="absolute top-2 right-2 flex gap-2 z-50">
//                                     <button
//                                         onClick={handleReset}
//                                         title="ریست زوم"
//                                         className="bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-md hover:shadow-lg"
//                                     >
//                                         <RefreshCcw className="w-6 h-6 text-orange-500 dark:text-orange-400"/>
//                                     </button>
//                                     <button
//                                         onClick={closeImage}
//                                         title="بستن"
//                                         className="bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-md hover:shadow-lg"
//                                     >
//                                         <CloseIcon className="text-orange-500 dark:text-orange-400"/>
//                                     </button>
//                                 </div>
//                             </div>
//
//                             {imageIndex < allImages.length - 1 && (
//                                 <button
//                                     onClick={nextImage}
//                                     className="text-white hover:text-orange-300 sm:absolute sm:right-4 z-20"
//                                 >
//                                     <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12"/>
//                                 </button>
//                             )}
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </section>
//     );
// };
//
// export default ImageGalleryAboutUs;
//


// components/ImageGalleryAboutUs.jsx

import {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
import {motion, AnimatePresence} from "framer-motion";
import {ChevronLeft, ChevronRight, RefreshCcw} from "lucide-react";
import Image from "next/image";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {useLocale} from "../../../lib/localeContext";

const CloseIcon = ({className = ""}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-6 ${className}`}
    >
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const ImageGalleryAboutUs = () => {
    const router = useRouter();
    const {t} = useLocale();

    // فراخوانی داده‌های ترجمه‌شده
    const gallery = t("gallery"); // { title, subTitle, zoomHint, buttons, sections }
    const {title, subTitle, zoomHint, buttons, sections} = gallery;

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageIndex, setImageIndex] = useState(null);
    const transformWrapperRef = useRef(null);

    // فلت کردن همهٔ تصاویر برای ناوبری
    const allImages = Object.values(sections)
        .map((sec) => sec.images)
        .flat();

    // همگام‌سازی state با query پارامتر image
    useEffect(() => {
        const name = router.query.image
            ? decodeURIComponent(router.query.image)
            : null;
        const idx = name ? allImages.indexOf(name) : -1;
        if (idx !== -1) {
            setSelectedImage(name);
            setImageIndex(idx);
        } else {
            setSelectedImage(null);
            setImageIndex(null);
        }
    }, [router.query.image, allImages]);

    // مدیریت کلیدهای جهت‌نما و Escape و اسکرول صفحه
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") closeImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        document.body.style.overflow = selectedImage ? "hidden" : "auto";
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "auto";
        };
    }, [selectedImage]);

    // باز کردن تصویر (اضافه کردن query param)
    const openImage = (src, index) => {
        const name = encodeURIComponent(src);
        const basePath = router.asPath.split("?")[0];
        router.push(`${basePath}?image=${name}`, undefined, {shallow: true});
        setImageIndex(index);
    };

    // بستن پنجره تصویر
    const closeImage = () => {
        router.replace(router.asPath.split("?")[0], undefined, {shallow: true});
    };

    // ناوبری به تصویر بعدی
    const nextImage = () => {
        if (imageIndex < allImages.length - 1) {
            openImage(allImages[imageIndex + 1], imageIndex + 1);
        }
    };

    // ناوبری به تصویر قبلی
    const prevImage = () => {
        if (imageIndex > 0) {
            openImage(allImages[imageIndex - 1], imageIndex - 1);
        }
    };

    // ریست کردن زوم
    const handleReset = () => {
        transformWrapperRef.current?.resetTransform();
    };

    return (
        <section
            className="relative bg-gradient-to-b from-gray-100 via-white to-gray-50
                 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
                 py-20 px-6 md:px-20 overflow-hidden text-black dark:text-white"
        >
            {/* عنوان و زیرعنوان */}
            <motion.div
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-IranNastaliq md:text-5xl font-extrabold text-orange-500 dark:text-orange-400 mb-4 drop-shadow-md">
                    {title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    {subTitle}
                </p>
            </motion.div>

            {/* رندر بخش‌ها */}
            {Object.entries(sections).map(([key, sec], sectionIdx) => {
                const baseIndex = Object.values(sections)
                    .slice(0, sectionIdx)
                    .map((s) => s.images)
                    .flat().length;

                return (
                    <div key={key} className="mb-16">
                        <h3
                            className="text-2xl font-extrabold mb-12 text-center max-w-md mx-auto
                         rounded-xl py-3 px-8 select-none transition-colors duration-300
                         bg-orange-50 border-2 border-orange-300 text-orange-700 shadow-lg
                         dark:bg-slate-800 dark:border-orange-600 dark:text-orange-400
                         dark:shadow-[0_4px_8px_rgba(255,140,0,0.3)]"
                        >
                            {sec.title}
                        </h3>

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-[1700px] mx-auto">
                            {sec.images.map((src, idx) => {
                                const flatIndex = baseIndex + idx;
                                return (
                                    <motion.div
                                        key={src}
                                        onClick={() => openImage(src, flatIndex)}
                                        className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition max-w-[320px] w-full"
                                        initial={{opacity: 0, scale: 0.95}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.4, delay: idx * 0.05}}
                                        viewport={{once: true}}
                                    >
                                        <div className="relative w-full aspect-square">
                                            <Image
                                                src={src}
                                                alt={`تصویر ${flatIndex + 1}`}
                                                fill
                                                className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition rounded-2xl"/>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-sm font-semibold backdrop-blur-sm bg-black/30 rounded-2xl">
                                                {zoomHint}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* پنجره‌ی نمایش تصویر انتخاب‌شده */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            transition={{duration: 0.3}}
                            className="relative w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            {imageIndex > 0 && (
                                <button
                                    onClick={prevImage}
                                    className="text-white hover:text-orange-300 sm:absolute sm:left-4 z-20"
                                >
                                    <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12"/>
                                </button>
                            )}

                            <div className="relative w-full flex items-center justify-center">
                                <TransformWrapper
                                    ref={transformWrapperRef}
                                    initialScale={1}
                                    minScale={0.8}
                                    maxScale={4}
                                    doubleClick={{disabled: true}}
                                >
                                    <TransformComponent wrapperClass="w-full flex items-center justify-center">
                                        <Image
                                            src={selectedImage}
                                            alt="بزرگنمایی تصویر"
                                            width={1000}
                                            height={800}
                                            className="rounded-xl shadow-2xl border-4 border-orange-300 dark:border-orange-400 max-h-[80vh] w-full sm:w-auto object-contain"
                                            priority
                                        />
                                    </TransformComponent>
                                </TransformWrapper>

                                <div className="absolute top-2 right-2 flex gap-2 z-50">
                                    <button
                                        onClick={handleReset}
                                        title={buttons.resetZoom}
                                        className="bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-md hover:shadow-lg"
                                    >
                                        <RefreshCcw className="w-6 h-6 text-orange-500 dark:text-orange-400"/>
                                    </button>
                                    <button
                                        onClick={closeImage}
                                        title={buttons.close}
                                        className="bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-md hover:shadow-lg"
                                    >
                                        <CloseIcon className="text-orange-500 dark:text-orange-400"/>
                                    </button>
                                </div>
                            </div>

                            {imageIndex < allImages.length - 1 && (
                                <button
                                    onClick={nextImage}
                                    className="text-white hover:text-orange-300 sm:absolute sm:right-4 z-20"
                                >
                                    <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12"/>
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ImageGalleryAboutUs;
