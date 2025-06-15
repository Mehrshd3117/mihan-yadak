import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading || router.pathname === "/404") return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-900 text-white">
      <div className="animate-spin-slow mb-6">
        <Image
          src="/Logos/Logo1.png"
          alt="لوگو"
          width={96}
          height={96}
          priority
          className="object-contain"
        />
      </div>
      <p className="text-xl font-semibold text-white text-center">
        در حال بارگذاری محتوای سایت...
      </p>
      <p className="text-sm text-orange-300 mt-2 text-center">
        از صبوری و همراهی شما بی‌نهایت سپاسگزاریم 🌟
      </p>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2.2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
