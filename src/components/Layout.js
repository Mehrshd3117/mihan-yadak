import Head from "next/head";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";

const Layout = ({ children, title, content }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`میهن یدک ${content}`} />
  
      </Head>
      <ScrollProgress />
      <Header />
      <ScrollToTop />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
