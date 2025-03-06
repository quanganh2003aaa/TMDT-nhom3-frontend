import React from "react";
import { Helmet } from "react-helmet";
import ProductDetails from "../components/sproduct/ProductDetails";
import ProductReview from "../components/sproduct/ProductReview";
import Newsletter from "../components/newsletter";
import ProductHighlight from "../components/home/productHighlight";

const ProductDetailPage = () => {
  return (
    <div>
        <Helmet>
            <title>Chi tiết sản phẩm - SneakerStudio</title>
        </Helmet>
        <ProductDetails />
        <ProductReview />
        <ProductHighlight />
        <Newsletter />
    </div>
  );
};

export default ProductDetailPage;
