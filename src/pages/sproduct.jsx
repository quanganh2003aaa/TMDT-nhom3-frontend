import React from "react";
import { Helmet } from "react-helmet";
import ProductDetails from "../components/sproduct/ProductDetails";
import ProductReview from "../components/sproduct/ProductReview";
import Cart from "../components/Cart";
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
        <Cart />
    </div>
  );
};

export default ProductDetailPage;
