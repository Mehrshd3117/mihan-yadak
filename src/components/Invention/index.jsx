//
// // export default memo(Invention);
// import "typeface-vazir";
// import Image from "next/image";
// import { useState, useRef, useEffect, memo } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";
// import {
//   FaTimes,
//   FaSearchPlus,
//   FaSearchMinus,
//   FaArrowsAlt,
// } from "react-icons/fa";
//
// const imageList = [
//   "/images/inventions/invention-1.webp",
//   "/images/inventions/invention-2.webp",
//   "/images/inventions/invention-3.webp",
//   "/images/inventions/invention-4.webp",
//   "/images/inventions/invention-5.webp",
//   "/images/inventions/invention-6.webp",
//   "/images/inventions/invention-7.webp",
//   "/images/inventions/invention-8.webp",
//   "/images/inventions/invention-9.webp",
// ];
//
// const Invention = () => {
//   const [modalImg, setModalImg] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
//
//   const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
//   const handleZoomOut = () => {
//     if (zoomLevel <= 1) setPosition({ x: 0, y: 0 });
//     setZoomLevel((prev) => Math.max(prev - 0.25, 1));
//   };
//   const resetImage = () => {
//     setZoomLevel(1);
//     setPosition({ x: 0, y: 0 });
//   };
//
//   const handleMouseDown = (e) => {
//     if (zoomLevel > 1) {
//       setIsDragging(true);
//       setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
//     }
//   };
//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
//     }
//   };
//   const handleMouseUp = () => setIsDragging(false);
//   const resetModal = () => {
//     setModalImg(null);
//     resetImage();
//   };
//
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") resetModal();
//     };
//
//     if (modalImg) {
//       document.body.style.overflow = "hidden";
//       window.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.body.style.overflow = "auto";
//       window.removeEventListener("keydown", handleKeyDown);
//     }
//
//     return () => {
//       document.body.style.overflow = "auto";
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [modalImg]);
//
//   return (
//     <div className="py-12 font-vazir bg-gray-50 dark:bg-slate-900">
//       {/* عنوان */}
//       <div className="flex items-center justify-center mb-10 relative">
//         <div className="hidden md:block w-48 h-0.5 mr-5 bg-gradient-to-l from-orange-400 to-transparent dark:from-[#ff7b00] animate-[extendLine_0.8s_ease-out_forwards] opacity-0"></div>
//         <h2
//           className="font-DimaYekanBold text-orange-500 md:text-slate-800 md:dark:text-white text-4xl sm:text-4xl md:text-5xl font-bold text-shadow dark:text-shadow animate-[fadeIn_0.5s_0.4s_ease-out_forwards] opacity-0"
//           style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
//         >
//           ثبت مالکیت صنعتی
//         </h2>
//         <div className="hidden md:block w-48 h-0.5 ml-5 bg-gradient-to-r from-orange-400 to-transparent dark:from-[#ff7b00] animate-[extendLine_0.8s_ease-out_forwards] opacity-0"></div>
//       </div>
//
//       <style jsx>{`
//         @keyframes extendLine {
//           0% {
//             transform: scaleX(0);
//             opacity: 0;
//           }
//           100% {
//             transform: scaleX(1);
//             opacity: 1;
//           }
//         }
//         @keyframes fadeIn {
//           0% {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .text-shadow {
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//         }
//         .dark .text-shadow {
//           text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
//         }
//       `}</style>
//
//       {/* اسلایدر */}
//       <div className="w-full overflow-hidden mb-14">
//         <Swiper
//           modules={[Navigation, Autoplay, EffectCoverflow]}
//           navigation
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           effect="coverflow"
//           grabCursor={true}
//           centeredSlides={true}
//           loop={true}
//           slidesPerView="auto"
//           coverflowEffect={{
//             rotate: 30,
//             stretch: 0,
//             depth: 300,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           className="pb-16"
//         >
//           {imageList.map((src, index) => (
//             <SwiperSlide
//               key={index}
//               className="w-[400px] lg:max-w-[31vw] rounded-xl overflow-hidden shadow-xl dark:shadow-2xl cursor-pointer"
//               onClick={() => setModalImg(src)}
//             >
//               <div className="relative w-full h-[80vh]">
//                 <Image
//                   src={src}
//                   alt={`اختراع ${index + 1}`}
//                   fill
//                   className="rounded-xl object-cover"
//                   sizes="(max-width: 900px) 100vw, 400px"
//                   priority={index === 0}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//
//       {/* مودال */}
//       {modalImg && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-95 dark:bg-black dark:bg-opacity-90"
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//         >
//           <div
//             className="relative max-w-[90vw] max-h-[90vh] w-full h-full sm:w-[70vw] sm:h-[80vh] rounded-lg"
//             onMouseDown={handleMouseDown}
//             onWheel={(e) => {
//               e.preventDefault();
//               e.deltaY > 0 ? handleZoomOut() : handleZoomIn();
//             }}
//             style={{
//               transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
//               cursor:
//                 zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
//               transition: isDragging ? "none" : "transform 0.3s ease",
//             }}
//           >
//             <Image
//               src={modalImg}
//               alt="نمایش بزرگ"
//               fill
//               className="object-contain rounded-lg"
//               sizes="95vh"
//             />
//           </div>
//
//           <div className="absolute top-4 right-4 flex gap-2">
//             <button
//               onClick={handleZoomIn}
//               className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
//               title="بزرگ‌نمایی"
//             >
//               <FaSearchPlus size={18} />
//             </button>
//             <button
//               onClick={handleZoomOut}
//               className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
//               title="کوچک‌نمایی"
//               disabled={zoomLevel <= 1}
//             >
//               <FaSearchMinus size={18} />
//             </button>
//             <button
//               onClick={resetImage}
//               className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
//               title="بازنشانی"
//               disabled={zoomLevel === 1 && position.x === 0 && position.y === 0}
//             >
//               <FaArrowsAlt size={18} />
//             </button>
//             <button
//               onClick={resetModal}
//               className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition dark:bg-red-700 dark:hover:bg-red-800"
//               title="بستن"
//             >
//               <FaTimes size={18} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default memo(Invention);


// components/Invention.jsx
import "typeface-vazir";
import Image from "next/image";
import {useState, useRef, useEffect, memo} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay, EffectCoverflow} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
    FaTimes,
    FaSearchPlus,
    FaSearchMinus,
    FaArrowsAlt,
} from "react-icons/fa";
import {useLocale} from "../../../lib/localeContext";

const imageList = [
    "/images/inventions/invention-1.webp",
    "/images/inventions/invention-2.webp",
    "/images/inventions/invention-3.webp",
    "/images/inventions/invention-4.webp",
    "/images/inventions/invention-5.webp",
    "/images/inventions/invention-6.webp",
    "/images/inventions/invention-7.webp",
    "/images/inventions/invention-8.webp",
    "/images/inventions/invention-9.webp",
];

const Invention = () => {
    const {t} = useLocale();
    const [modalImg, setModalImg] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({x: 0, y: 0});

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => {
        if (zoomLevel <= 1) setPosition({x: 0, y: 0});
        setZoomLevel((prev) => Math.max(prev - 0.25, 1));
    };
    const resetImage = () => {
        setZoomLevel(1);
        setPosition({x: 0, y: 0});
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setStartPos({x: e.clientX - position.x, y: e.clientY - position.y});
        }
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({x: e.clientX - startPos.x, y: e.clientY - startPos.y});
        }
    };
    const handleMouseUp = () => setIsDragging(false);
    const resetModal = () => {
        setModalImg(null);
        resetImage();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") resetModal();
        };

        if (modalImg) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalImg]);

    return (
        <div className="py-12 font-vazir bg-gray-50 dark:bg-slate-900" id="inventionList">
            {/* عنوان */}
            <div className="flex items-center justify-center mb-10 relative">
                <div
                    className="hidden md:block w-48 h-0.5 mr-5 bg-gradient-to-l from-orange-400 to-transparent dark:from-[#ff7b00] animate-[extendLine_0.8s_ease-out_forwards] opacity-0"></div>
                <h2
                    className="font-DimaYekanBold text-orange-500 md:text-slate-800 md:dark:text-white text-4xl sm:text-4xl md:text-5xl font-bold text-shadow dark:text-shadow animate-[fadeIn_0.5s_0.4s_ease-out_forwards] opacity-0"
                    style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}
                >
                    {t("invention.title")}
                </h2>
                <div
                    className="hidden md:block w-48 h-0.5 ml-5 bg-gradient-to-r from-orange-400 to-transparent dark:from-[#ff7b00] animate-[extendLine_0.8s_ease-out_forwards] opacity-0"></div>
            </div>

            <style jsx>{`
              @keyframes extendLine {
                0% {
                  transform: scaleX(0);
                  opacity: 0;
                }
                100% {
                  transform: scaleX(1);
                  opacity: 1;
                }
              }

              @keyframes fadeIn {
                0% {
                  opacity: 0;
                  transform: translateY(10px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .text-shadow {
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              }

              .dark .text-shadow {
                text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
              }
            `}</style>

            {/* اسلایدر */}
            <div className="w-full overflow-hidden mb-14">
                <Swiper
                    modules={[Navigation, Autoplay, EffectCoverflow]}
                    navigation
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 300,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    className="pb-16"
                >
                    {imageList.map((src, index) => (
                        <SwiperSlide
                            key={index}
                            className="w-[400px] lg:max-w-[31vw] rounded-xl overflow-hidden shadow-xl dark:shadow-2xl cursor-pointer"
                            onClick={() => setModalImg(src)}
                        >
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={src}
                                    alt={`${t("invention.altPrefix")} ${index + 1}`}
                                    fill
                                    className="rounded-xl object-cover"
                                    sizes="(max-width: 900px) 100vw, 400px"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* مودال */}
            {modalImg && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-95 dark:bg-black dark:bg-opacity-90"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] w-full h-full sm:w-[70vw] sm:h-[80vh] rounded-lg"
                        onMouseDown={handleMouseDown}
                        onWheel={(e) => {
                            e.preventDefault();
                            e.deltaY > 0 ? handleZoomOut() : handleZoomIn();
                        }}
                        style={{
                            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                            cursor:
                                zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                            transition: isDragging ? "none" : "transform 0.3s ease",
                        }}
                    >
                        <Image
                            src={modalImg}
                            alt={t("invention.modalAlt")}
                            fill
                            className="object-contain rounded-lg"
                            sizes="95vh"
                        />
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={handleZoomIn}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
                            title={t("invention.zoomIn")}
                        >
                            <FaSearchPlus size={18}/>
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
                            title={t("invention.zoomOut")}
                            disabled={zoomLevel <= 1}
                        >
                            <FaSearchMinus size={18}/>
                        </button>
                        <button
                            onClick={resetImage}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition dark:bg-[#ff7b00] dark:hover:bg-[#cc6600]"
                            title={t("invention.reset")}
                            disabled={zoomLevel === 1 && position.x === 0 && position.y === 0}
                        >
                            <FaArrowsAlt size={18}/>
                        </button>
                        <button
                            onClick={resetModal}
                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition dark:bg-red-700 dark:hover:bg-red-800"
                            title={t("invention.close")}
                        >
                            <FaTimes size={18}/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Invention);
