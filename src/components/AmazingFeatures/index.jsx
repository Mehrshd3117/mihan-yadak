

// ── /src/pages/components/AmazingFeatures.js ──
import { FaCheckCircle, FaCubes, FaAward, FaHeadset } from "react-icons/fa";
import { useState } from "react";
import Head from "next/head";
import { useLocale } from "../../../lib/localeContext";

const iconMap = {
  FaCheckCircle: <FaCheckCircle className="text-orange-500 dark:text-orange-500 text-5xl" />,
  FaCubes: <FaCubes className="text-orange-500 dark:text-orange-500 text-5xl" />,
  FaAward: <FaAward className="text-orange-500 dark:text-orange-500 text-5xl" />,
  FaHeadset: <FaHeadset className="text-orange-500 dark:text-orange-500 text-5xl" />,
};

const AmazingFeatures = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { locale, t } = useLocale();

  // جزئیات ویژگی‌ها در فایل ترجمه
  const features = [
    {
      icon: "FaCheckCircle",
      title: t("amazing.feature1.title"),
      description: t("amazing.feature1.description"),
      extra: t("amazing.feature1.extra"),
    },
    {
      icon: "FaCubes",
      title: t("amazing.feature2.title"),
      description: t("amazing.feature2.description"),
      extra: t("amazing.feature2.extra"),
    },
    {
      icon: "FaAward",
      title: t("amazing.feature3.title"),
      description: t("amazing.feature3.description"),
      extra: t("amazing.feature3.extra"),
    },
    {
      icon: "FaHeadset",
      title: t("amazing.feature4.title"),
      description: t("amazing.feature4.description"),
      extra: t("amazing.feature4.extra"),
    },
  ];

  return (
    <section
      className="bg-gray-50 dark:bg-slate-900 py-28 text-right text-gray-800 dark:text-white"
      dir="rtl"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: t("amazing.schemaName"),
              itemListElement: features.map((feat, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: feat.title,
                description: feat.description,
              })),
            }),
          }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-DimaYekanBold text-4xl font-extrabold text-orange-500 dark:text-orange-500 mb-4">
            {t("amazing.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("amazing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group rounded-2xl shadow-lg p-6 text-center transition duration-300 overflow-hidden border border-gray-200 dark:border-none bg-white dark:bg-[#34495e] hover:shadow-2xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="mb-4 flex justify-center transition-all duration-300 group-hover:opacity-20 group-hover:scale-95">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-600 dark:text-orange-300 border-b border-orange-300 dark:border-orange-500 pb-2 transition-all duration-300 group-hover:opacity-20 group-hover:scale-95">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-200 text-base leading-relaxed transition-all duration-300 group-hover:opacity-10">
                {feature.description}
              </p>

              <div
                className={`absolute inset-0 backdrop-blur-md p-6 flex items-center justify-center text-center text-sm rounded-2xl transition-all duration-500 ease-in-out ${
                  hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                } bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-100`}
              >
                <span className="text-base leading-relaxed">{feature.extra}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmazingFeatures;
