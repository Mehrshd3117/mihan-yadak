import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;
          const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const scrolled = (scrollTop / scrollHeight) * 100;

          if (progressRef.current) {
            progressRef.current.style.width = `${scrolled}%`;
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-2 bg-gray-200 dark:bg-slate-500 z-50"
      dir="ltr"
      aria-hidden="true"
    >
      <div
        ref={progressRef}
        className="h-full bg-orange-500"
        style={{ width: "0%" }}
      ></div>
    </div>
  );
}
