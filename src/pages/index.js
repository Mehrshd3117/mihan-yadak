// // /pages/index.js
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
// import { connectDB } from "../../lib/mongodb";
// import Product from "../../models/Product";

// export async function getStaticProps() {
//   await connectDB();
//   const docs = await Product.find({ isTrending: true })
//     .select("slug imgSrc")
//     .lean();

//   const trendingProducts = docs.map(p => ({
//     slug: p.slug,
//     imgSrc: p.imgSrc,
//     titleKey: `trendingProducts.products.${p.slug}.title`
//   }));

//   return {
//     props: { trendingProducts },
//     revalidate: 3600, // بازسازی هر ساعت
//   };
// }

// export default function HomePage({ trendingProducts }) {
//   return (
//     <>
//       <Head>
//         <title>میهن یدک | صفحه اصلی</title>
//         <meta name="description" content="صفحه اصلی میهن یدک گرمسار" />
//       </Head>
//       <Layout>
//         <HeroSection />
//         <AmazingFeatures />
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
//ببین این کار میکنه و درسته صرفا چون نمیتونم روی ورسل بیلد بگیرم الان کامنتش کردم ورگنه درسته این 



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
import { connectDB } from "../../lib/mongodb";           // دقت کنید مسیر درست باشد
import Product from "../../models/Product";

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const docs = await Product.find({ isTrending: true })
      .select("slug imgSrc")
      .lean();
    const trendingProducts = docs.map(p => ({
      slug: p.slug,
      imgSrc: p.imgSrc,
      titleKey: `trendingProducts.products.${p.slug}.title`
    }));
    return { props: { trendingProducts } };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { props: { trendingProducts: [] } };
  }
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
