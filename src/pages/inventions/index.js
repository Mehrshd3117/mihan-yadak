
// src/pages/inventions/index.js
import { useState, useEffect } from "react";
import en from "../../../locales/en/common.json";
import fa from "../../../locales/fa/common.json";
import { useLocale } from "../../../lib/localeContext";
import Layout from "@/components/Layout";
import HeroSectionInventions from "@/components/HeroSectionInventions";
import InventionsImageGallery from "@/components/InventionsImageGallery";

const InventionsPage = () => {
  const { locale, t } = useLocale(); // تغییر current به locale

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    console.log("▶️ fa first item rawmehrrr:", fa.inventions.gallery[0]);
    console.log("▶️ fa first item keys:", Object.keys(fa.inventions.gallery[0]));

    if (locale === "fa") {
      setGallery(fa.inventions.gallery || []);
    } else {
      setGallery(en.inventions.gallery || []);
    }
  }, [locale]); // وابستگی به locale

  const Hero = {
    count: gallery.length,
    inventions: gallery.slice(0, 4).map((item) => item.title),
  };

  return (
    <Layout title={t("inventions.title")} content={t("inventions.content")}>
      <HeroSectionInventions Hero={Hero} />
      <InventionsImageGallery gallery={gallery} />
    </Layout>
  );
};

export default InventionsPage;