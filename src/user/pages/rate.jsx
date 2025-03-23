import React from "react";
import { Helmet } from "react-helmet";
import Rates from "../components/user-detail/RateProduct";
import Newsletter from "../components/newsletter";

const Rate = () => {
    return(
        <div>
            <Helmet>
                <title>Đánh Giá Đơn Hàng - SneakerStudio</title>
            </Helmet>
            <Rates />
            <Newsletter />
        </div>
    );
};

export default Rate;