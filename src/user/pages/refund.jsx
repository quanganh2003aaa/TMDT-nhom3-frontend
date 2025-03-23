import React from "react";
import { Helmet } from "react-helmet";
import Refunds from "../components/user-detail/Refund";
import Newsletter from "../components/newsletter";

const Product = () => {
    return(
        <div>
            <Helmet>
                <title>Lý Do Hoàn Trả - SneakerStudio</title>
            </Helmet>
            <Refunds />
            <Newsletter />
        </div>
    );
};

export default Product;