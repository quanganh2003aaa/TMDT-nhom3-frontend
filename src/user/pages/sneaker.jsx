import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/product/ShoesList";
import Newsletter from "../components/newsletter";

const Sneaker = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách giày - SneakerStudio</title>
            </Helmet>
            <ProductList />
            <Newsletter />
        </div>
    );
};

export default Sneaker;