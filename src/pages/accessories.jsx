import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/product/AccessoriesList";
import Newsletter from "../components/newsletter";

const Accessories = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách phụ kiện - Sneaker Studio</title>
            </Helmet>
            <ProductList />
            <Newsletter />
        </div>
    );
};

export default Accessories;