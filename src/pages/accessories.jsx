import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/product/AccessoriesList";
import Cart from "../components/product/Cart";
import Newsletter from "../components/newsletter";

const Accessories = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách phụ kiện - Sneaker Studio</title>
            </Helmet>
            <ProductList />
            <Cart />
            <Newsletter />
        </div>
    );
};

export default Accessories;