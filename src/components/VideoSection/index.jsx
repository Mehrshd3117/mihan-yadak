// import {memo, useState, useRef, useCallback} from "react";
// import {PlayCircle} from "lucide-react";
//
// const VideoSection = memo(function VideoSection({
//                                                     title,
//                                                     description,
//                                                     videoSrc,
//                                                     posterSrc,
//                                                 }) {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const videoRef = useRef(null);
//
//     const handlePlay = useCallback(() => {
//         if (videoRef.current) {
//             videoRef.current.play();
//             setIsPlaying(true);
//         }
//     }, []);
//
//     export const videoSectionData = {
//         title: "درباره شرکت میهن یدک گرمسار",
//         videoSrc: "/images/video-section/about.mp4",
//         posterSrc: "/images/video-section/poster.webp",
//         description: {
//             main: "شرکت میهن یدک گرمسار، اولین و بزرگترین تولید کننده قطعات برقی موتورسیکلت در ایران با بیش از ۲۵ سال تجربه است. این مجموعه با تکیه بر دانش فنی، ثبت ۹ اختراع ملی، و همکاری با فنی‌وحرفه‌ای کشور، گام‌های مؤثری در آموزش تعمیرکاران و ارتقاء صنعت موتورسیکلت برداشته است.",
//             note: "در ادامه می‌توانید ویدیوی معرفی مجموعه و فرآیندهای تولید و آموزشی ما را مشاهده کنید.",
//         },
//     };
//
//     return (
//         <section
//             className="bg-gradient-to-b from-gray-50 via-gray-200 to-gray-100
//                  dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
//                  text-gray-900 dark:text-white py-5 md:pt-5 md:pb-16
//                  px-8 md:px-16 font-vazir"
//         >
//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
//                 {/* Text */}
//                 <div className="space-y-8">
//                     <div className="mb-10 group">
//                         <h2
//                             className="text-3xl md:text-4xl text-center font-extrabold
//                          text-orange-600 dark:text-orange-500 mb-4 drop-shadow-lg"
//                         >
//                             {title}
//                         </h2>
//                         <div
//                             className="w-full h-[0.2rem] bg-orange-500 dark:bg-white
//                          transition-all duration-500 group-hover:w-[90%] mx-auto"
//                         />
//                     </div>
//                     <p className="text-lg text-gray-700 dark:text-gray-200 leading-loose my-10">
//                         {description?.main}
//                     </p>
//                     <p
//                         className="text-base text-gray-600 dark:text-gray-300 italic
//                        border-r-4 border-orange-500 pr-6 py-4
//                        bg-white/10 dark:bg-black/10 rounded-r-lg"
//                     >
//                         {description?.note}
//                     </p>
//                 </div>
//
//                 {/* Video */}
//                 <div
//                     className="relative rounded-2xl overflow-hidden border-4 group
//                      border-orange-400 dark:border-orange-500
//                      shadow-[0_0_1rem_0.2rem_#ff8d36] dark:shadow-[0_0_1rem_0.2rem_#eeeeee]"
//                 >
//                     <video
//                         ref={videoRef}
//                         src={videoSrc}
//                         poster={posterSrc}
//                         controls={isPlaying}
//                         className="w-full h-full object-cover group-hover:scale-105"
//                         onPlay={() => setIsPlaying(true)}
//                         preload="metadata"
//                         playsInline
//                         muted={!isPlaying}
//                     />
//                     {!isPlaying && (
//                         <button
//                             onClick={handlePlay}
//                             aria-label="پخش ویدیو"
//                             className="absolute inset-0 flex items-center justify-center
//                          bg-black/30 hover:bg-black/20 transition-all duration-500 animate-pulse"
//                         >
//                             <PlayCircle
//                                 className="w-24 h-24 text-white hover:text-orange-500
//                            transition-all duration-300 hover:scale-110"
//                             />
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// });
//
// export default VideoSection;



import { memo, useState, useRef, useCallback } from "react";
import { PlayCircle } from "lucide-react";
import { useLocale } from "../../../lib/localeContext";

const VideoSection = memo(function VideoSection() {
  const { t } = useLocale();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const videoSrc = t("video.videoSrc");
  const posterSrc = t("video.posterSrc");

  return (
    <section
      className="bg-gradient-to-b from-gray-50 via-gray-200 to-gray-100
                 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
                 text-gray-900 dark:text-white py-5 md:pt-5 md:pb-16
                 px-8 md:px-16 font-vazir"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Text */}
        <div className="space-y-8">
          <div className="mb-10 group">
            <h2
              className="text-3xl md:text-4xl text-center font-extrabold
                         text-orange-600 dark:text-orange-500 mb-4 drop-shadow-lg"
            >
              {t("video.title")}
            </h2>
            <div
              className="w-full h-[0.2rem] bg-orange-500 dark:bg-white
                         transition-all duration-500 group-hover:w-[90%] mx-auto"
            />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-loose my-10">
            {t("video.description.main")}
          </p>
          <p
            className="text-base text-gray-600 dark:text-gray-300 italic
                       border-r-4 border-orange-500 pr-6 py-4
                       bg-white/10 dark:bg-black/10 rounded-r-lg"
          >
            {t("video.description.note")}
          </p>
        </div>

        {/* Video */}
        <div
          className="relative rounded-2xl overflow-hidden border-4 group
                     border-orange-400 dark:border-orange-500
                     shadow-[0_0_1rem_0.2rem_#ff8d36] dark:shadow-[0_0_1rem_0.2rem_#eeeeee]"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            controls={isPlaying}
            className="w-full h-full object-cover group-hover:scale-105"
            onPlay={() => setIsPlaying(true)}
            preload="metadata"
            playsInline
            muted={!isPlaying}
          />
          {!isPlaying && (
            <button
              onClick={handlePlay}
              aria-label="پخش ویدیو"
              className="absolute inset-0 flex items-center justify-center
                         bg-black/30 hover:bg-black/20 transition-all duration-500 animate-pulse"
            >
              <PlayCircle
                className="w-24 h-24 text-white hover:text-orange-500
                           transition-all duration-300 hover:scale-110"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default VideoSection;
