import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#0b1e3c] flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 text-white text-center">
      {/* تصویر با انیمیشن */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-8 sm:mb-10"
      >
        <Image
          src="/images/404/404.webp"
          width={400}
          height={400}
          alt="صفحه پیدا نشد"
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* متن اصلی */}
      <motion.h2
        className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        صفحه مورد نظر یافت نشد!
      </motion.h2>

      {/* توضیح بیشتر */}
      <motion.p
        className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-5 sm:mb-6 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        یا آدرس اشتباه وارد شده یا این صفحه حذف شده. بهتره برگردی به صفحه اصلی
        تا مسیرت رو پیدا کنی.
      </motion.p>

      {/* دکمه بازگشت */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 sm:py-3 sm:px-6 rounded-full transition-all duration-300 shadow-lg text-sm sm:text-base"
        >
          بازگشت به خانه
        </Link>
      </motion.div>
    </div>
  );
}
