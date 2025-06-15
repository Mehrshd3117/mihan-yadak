import Layout from "@/components/Layout";

import ProductsList from "@/components/ProductsList";

const ProductsPage = () => {
  return (
    <>
      <Layout title={"محصولات میهن یدک"} content={" محصولات "}>
        <ProductsList />
      </Layout>
    </>
  );
};

export default ProductsPage;
