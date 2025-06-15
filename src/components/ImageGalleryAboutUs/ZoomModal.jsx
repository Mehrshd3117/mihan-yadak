import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

const ZoomModal = dynamic(() => import("./ZoomModal"), { ssr: false });

const ImageGalleryAboutUs = ({
  imagesBySection,
  imageGalleryTitle,
  imageGallerySubTitle,
}) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const transformWrapperRef = useRef(null);

  const allImages = Object.values(imagesBySection).flat();

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
  }, [router.query.image]);

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

  const openImage = (src, index) => {
    const name = encodeURIComponent(src);
    const basePath = router.asPath.split("?")[0];
    router.push(`${basePath}?image=${name}`, undefined, { shallow: true });
    setImageIndex(index);
  };

  const closeImage = () => {
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  };

  const nextImage = () => {
    if (imageIndex < allImages.length - 1) {
      openImage(allImages[imageIndex + 1], imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex > 0) {
      openImage(allImages[imageIndex - 1], imageIndex - 1);
    }
  };

  const handleReset = () => {
    transformWrapperRef.current?.resetTransform();
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-20 px-6 md:px-20 overflow-hidden text-black dark:text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-IranNastaliq md:text-5xl font-extrabold text-orange-500 dark:text-orange-400 mb-4 drop-shadow-md">
          {imageGalleryTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          {imageGallerySubTitle}
        </p>
      </div>

      {Object.entries(imagesBySection).map(
        ([sectionTitle, imageNames], sectionIdx) => {
          const baseIndex = Object.values(imagesBySection)
            .slice(0, sectionIdx)
            .flat().length;

          return (
            <div key={sectionTitle} className="mb-16">
              <h3 className="text-2xl font-extrabold mb-12 text-center max-w-md mx-auto rounded-xl py-3 px-8 select-none transition-colors duration-300 bg-orange-50 border-2 border-orange-30 text-orange-700 shadow-lg dark:bg-slate-800 dark:border-orange-600 dark:text-orange-400 dark:shadow-[0_4px_8px_rgba(255,140,0,0.3)]">
                {sectionTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-[1700px] mx-auto">
                {imageNames.map((name, idx) => {
                  const fullSrc = name;
                  const flatIndex = baseIndex + idx;

                  return (
                    <div
                      key={fullSrc}
                      onClick={() => openImage(fullSrc, flatIndex)}
                      className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition max-w-[320px] w-full"
                    >
                      <div className="relative w-full aspect-square">
                        <Image
                          src={fullSrc}
                          alt={`تصویر ${flatIndex + 1}`}
                          fill
                          className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition rounded-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-sm font-semibold backdrop-blur-sm bg-black/30 rounded-2xl">
                          برای بزرگنمایی کلیک نمایید
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}

      {selectedImage && (
        <ZoomModal
          selectedImage={selectedImage}
          imageIndex={imageIndex}
          allImages={allImages}
          onClose={closeImage}
          onPrev={prevImage}
          onNext={nextImage}
          onReset={handleReset}
          wrapperRef={transformWrapperRef}
        />
      )}
    </section>
  );
};

export default ImageGalleryAboutUs;
