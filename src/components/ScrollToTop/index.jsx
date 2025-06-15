import { useEffect, useRef, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const checkVisibility = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
      const isMobile = window.innerWidth <= 768;

      let shouldShow = false;
      if (scrollY > 300) {
        if (isMobile && distanceFromBottom <= 30) {
          shouldShow = false;
        } else {
          shouldShow = true;
        }
      }

      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // initial check on mount
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="بازگشت به بالا"
      title="بازگشت به بالا"
      className={`fixed bottom-8 right-8 z-50 bg-orange-500 text-white font-bold p-3 rounded-full shadow-lg
        transition-opacity duration-300 ease-in-out
        ${
          isVisible
            ? "opacity-90 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        hover:bg-white hover:text-orange-500`}
      style={{ willChange: "opacity" }}
    >
      <FaAngleDoubleUp className="text-2xl" />
    </button>
  );
}
