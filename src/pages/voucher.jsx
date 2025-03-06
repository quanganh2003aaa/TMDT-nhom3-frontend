import React from "react";
import { Helmet } from "react-helmet";
import Vouchers from "../components/voucher/Voucher";
import Newsletter from "../components/newsletter";

const Voucher = () => {
    return(
        <div>
            <Helmet>
                <title>Danh sách Voucher - SneakerStudio</title>
            </Helmet>
            <Vouchers />
            <Newsletter />
        </div>
    );
};

export default Voucher;