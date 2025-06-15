//
// // ── /pages/index.js ──
// import Head from "next/head";
// import Layout from "../components/Layout";
// import HeroSection from "../components/HeroSection";
// import AmazingFeatures from "../components/AmazingFeatures";
// import TrendingProducts from "../components/TrendingProducts";
// import CompanyProfile from "../components/CompanyProfile";
// import Faq from "../components/Faq";
// import PartnersSection from "../components/PartnersSection";
// import CustomerReviews from "../components/CustomerReviews";
// import NestedFaq from "../components/ProcessSteps";
// import Invention from "../components/Invention";
// import { heroData, featureData } from "../../public/lib/homedatas";
//
// // اگر می‌خواهی عنوان و متا را داینامیک کنی:
// import { useLocale } from "../../lib/localeContext";
//
// export async function getStaticProps() {
//   try {
//     const baseUrl =
//       process.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
//
//     const [faqRes, trendingRes] = await Promise.all([
//       fetch(`${baseUrl}/api/faqs`, {
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//       }),
//       fetch(`${baseUrl}/api/products?isTrending=true`, {
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//       }),
//     ]);
//
//     if (!faqRes.ok || !trendingRes.ok) {
//       throw new Error(
//         `Fetch failed: FAQs (${faqRes.status}), Trending (${trendingRes.status})`
//       );
//     }
//
//     const [faqJson, trendingJson] = await Promise.all([
//       faqRes.json(),
//       trendingRes.json(),
//     ]);
//
//     const faqs = faqJson?.data || [];
//     const trendingProducts = trendingJson?.data || [];
//
//     return {
//       props: {
//         heroData,
//         featureData,
//         faqs,
//         trendingProducts,
//       },
//       revalidate: 43200,
//     };
//   } catch (error) {
//     console.error("❌ خطا در دریافت داده‌های صفحه اصلی:", error.message);
//
//     return {
//       props: {
//         heroData,
//         featureData,
//         faqs: [],
//         trendingProducts: [],
//       },
//     };
//   }
// }
//
// export default function HomePage({
//   heroData,
//   featureData,
//   faqs,
//   trendingProducts,
// }) {
//   const { locale, t } = useLocale();
//
//   return (
//     <>
//       <Head>
//         <title>
//           {locale === "fa"
//             ? "میهن یدک | صفحه اصلی"
//             : "Mihan Yadak | Home"}
//         </title>
//         <meta
//           name="description"
//           content={
//             locale === "fa"
//               ? "صفحه اصلی میهن یدک گرمسار"
//               : "Mihan Yadak Home"
//           }
//         />
//       </Head>
//
//       <Layout>
//         <HeroSection className="mt-20" {...heroData} />
//         <AmazingFeatures featureData={featureData} />
//         <TrendingProducts slides={trendingProducts} />
//         <CompanyProfile />
//         <Faq faqs={faqs} />
//         <PartnersSection />
//         <CustomerReviews />
//         <Invention />
//         <NestedFaq />
//       </Layout>
//     </>
//   );
// }


//
//
// // ── /pages/index.js ──
// import Head from "next/head";
// import Layout from "../components/Layout";
// import HeroSection from "../components/HeroSection";
// import AmazingFeatures from "../components/AmazingFeatures";
// import TrendingProducts from "../components/TrendingProducts";
// import CompanyProfile from "../components/CompanyProfile";
// import Faq from "../components/Faq";
// import PartnersSection from "../components/PartnersSection";
// import CustomerReviews from "../components/CustomerReviews";
// import NestedFaq from "../components/ProcessSteps";
// import Invention from "../components/Invention";
// import { heroData, featureData } from "../../public/lib/homedatas";
// import { connectDB } from "../../lib/mongodb";
// import Product from "../../models/Product"; // مدل mongoose شما
//
// export async function getStaticProps() {
//   try {
//     // 1. وصل می‌شویم به MongoDB
//     await connectDB();
//
//     // 2. محصولات پرفروش را از دیتابیس می‌خوانیم
//     const trending = await Product.find({ isTrending: true })
//       .select("slug imgSrc")       // دقیقا همان فیلدهایی که لازم داری
//       .lean();
//
//     // 3. برای هر محصول یک titleKey می‌سازیم
//     const trendingProducts = trending.map((p) => ({
//       slug: p.slug,
//       imgSrc: p.imgSrc,
//       titleKey: `products.${p.slug}.title`,
//     }));
//
//     // 4. داده‌ها را به صفحه می‌فرستیم
//     return {
//       props: {
//         heroData,
//         featureData,
//         trendingProducts,
//       },
//       revalidate: 60 * 60, // هر ساعت یک‌بار بازسازی
//     };
//   } catch (error) {
//     console.error("❌ خطا در getStaticProps:", error);
//     return {
//       props: {
//         heroData,
//         featureData,
//         trendingProducts: [],
//       },
//     };
//   }
// }
//
// export default function HomePage({
//   heroData,
//   featureData,
//   trendingProducts,
// }) {
//   return (
//     <>
//       <Head>
//         <title>میهن یدک | صفحه اصلی</title>
//         <meta name="description" content="صفحه اصلی میهن یدک گرمسار" />
//       </Head>
//
//       <Layout>
//         <HeroSection {...heroData} />
//         <AmazingFeatures featureData={featureData} />
//         <TrendingProducts slides={trendingProducts} />
//         <CompanyProfile />
//         <Faq />
//         <PartnersSection />
//         <CustomerReviews />
//         <Invention />
//         <NestedFaq />
//       </Layout>
//     </>
//   );
// }

















// /pages/index.js
import Head from "next/head";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import AmazingFeatures from "../components/AmazingFeatures";
import TrendingProducts from "../components/TrendingProducts";
import CompanyProfile from "../components/CompanyProfile";
import Faq from "../components/Faq";
import PartnersSection from "../components/PartnersSection";
import CustomerReviews from "../components/CustomerReviews";
import NestedFaq from "../components/ProcessSteps";
import Invention from "../components/Invention";
import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";

export async function getStaticProps() {
  await connectDB();
  const docs = await Product.find({ isTrending: true })
    .select("slug imgSrc")
    .lean();

  const trendingProducts = docs.map(p => ({
    slug: p.slug,
    imgSrc: p.imgSrc,
    titleKey: `trendingProducts.products.${p.slug}.title`
  }));

  return {
    props: { trendingProducts },
    revalidate: 3600, // بازسازی هر ساعت
  };
}

export default function HomePage({ trendingProducts }) {
  return (
    <>
      <Head>
        <title>میهن یدک | صفحه اصلی</title>
        <meta name="description" content="صفحه اصلی میهن یدک گرمسار" />
      </Head>
      <Layout>
        <HeroSection />
        <AmazingFeatures />
        <TrendingProducts slides={trendingProducts} />
        <CompanyProfile />
        <Faq />
        <PartnersSection />
        <CustomerReviews />
        <Invention />
        <NestedFaq />
      </Layout>
    </>
  );
}
