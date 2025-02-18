import React from "react";
import { Helmet } from "react-helmet";
import Pay from "../components/pay/Pay";
import Newsletter from "../components/newsletter";

const Pays = () => {
    return(
        <div>
            <Helmet>
                <title>Thanh toán - SneakerStudio</title>
            </Helmet>
            <Pay />
            <Newsletter />
        </div>
    );
};

export default Pays;