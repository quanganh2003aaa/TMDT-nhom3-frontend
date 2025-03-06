import React from "react";
import { Helmet } from "react-helmet";
import Brand from "../components/product/BrandList";
import Newsletter from "../components/newsletter";

const Sneaker = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách thương hiệu - SneakerStudio</title>
            </Helmet>
            <Brand />
            <Newsletter />
        </div>
    );
};

export default Sneaker;