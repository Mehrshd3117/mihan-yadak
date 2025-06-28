
import React, { memo, useMemo } from "react";
import Head from "next/head";
import {
    BadgeCheck,
    Users,
    Wrench,
    Lightbulb,
    ShieldCheck,
    School,
} from "lucide-react";
import { useLocale } from "../../../lib/localeContext";

const iconMap = {
    BadgeCheck,
    Users,
    Wrench,
    Lightbulb,
    ShieldCheck,
    School,
};

const FeatureCard = memo(function FeatureCard({ Icon, title, description }) {
    return (
        <div
            className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-orange-200 p-4 md:p-6 text-center border border-gray-100 dark:border-gray-700 w-full transition-shadow duration-300">
            <div className="flex justify-center mb-3 md:mb-4">
                <div className="bg-gradient-to-tr from-orange-100 to-orange-200 rounded-full p-2 md:p-3">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-orange-500 my-3 md:my-5">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
});

const HeroSectionAbout = memo(function HeroSectionAbout({
    description,
    keywords,
}) {
    const { t } = useLocale();

    const features = t("about.features", { returnObjects: true }) || [];

    const cards = useMemo(
        () =>
            features.map(({ icon, title, description }, idx) => {
                const IconComponent = iconMap[icon] || (() => null);
                return (
                    <FeatureCard
                        key={`${title}-${idx}`}
                        Icon={IconComponent}
                        title={title}
                        description={description}
                    />
                );
            }),
        [features]
    );

    return (
        <>
            <Head>
                {description && <meta name="description" content={description} />}
                {keywords && <meta name="keywords" content={keywords} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>

            <section
                className="bg-gray-50 py-32 md:py-40 dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-4 md:px-16 font-vazir">
                {/* Intro */}
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="mt-5 font-IranNastaliq text-3xl md:text-5xl font-extrabold text-orange-500 mb-6 leading-tight">
                        {t("about.hero.title")}
                    </h1>

                    <p
                        className="max-w-6xl mx-auto p-6 md:p-12
              bg-gradient-to-br from-orange-50 via-white to-orange-100
              dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
              rounded-2xl
              border-l-4 border-orange-400
              dark:border-orange-500
              shadow-sm
              dark:shadow-md
              font-vazir
              leading-8 md:leading-10
              tracking-wide
              text-gray-800 dark:text-gray-200
              text-justify
              overflow-hidden
              transition-colors duration-300"
                        style={{
                            textShadow: "0 0 1px rgba(0,0,0,0.05)",
                        }}
                        dangerouslySetInnerHTML={{ __html: t("about.hero.description") }}
                    />

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-10">
                        {cards}
                    </div>
                </div>

                {/* Slogan */}
                <div
                    className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 pt-6 md:pt-10 px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-DimaYekanBold font-extrabold mb-4 md:mb-6 leading-snug border-b border-gray-300 dark:border-gray-700 pb-4 md:pb-5">
                        <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
                            {t("about.slogan.part1")}
                        </span>
                        {t("about.slogan.part2")}
                        <span className="text-3xl md:text-5xl text-orange-500 inline-block mx-2">
                            {t("about.slogan.part3")}
                        </span>
                        {t("about.slogan.part4")}
                    </h2>
                    <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                        {t("about.slogan.subtitle")}
                    </p>
                </div>
            </section>
        </>
    );
});

export default HeroSectionAbout;