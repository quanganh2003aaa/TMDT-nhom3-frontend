import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/product/ClothesList";
import Cart from "../components/product/Cart";
import Newsletter from "../components/newsletter";

const Accessories = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách quần áo - SneakerStudio</title>
            </Helmet>
            <ProductList />
            <Cart />
            <Newsletter />
        </div>
    );
};

export default Accessories;