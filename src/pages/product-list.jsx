import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/product/ProductList";
import Cart from "../components/product/Cart";
import Newsletter from "../components/newsletter";

const Product = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách sản phẩm - SneakerStudio</title>
            </Helmet>
            <ProductList />
            <Newsletter />
        </div>
    );
};

export default Product;