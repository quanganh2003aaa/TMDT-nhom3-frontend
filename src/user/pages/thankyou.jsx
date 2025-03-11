import React from "react";
import { Helmet } from "react-helmet";
import Thankyou from "../components/thankyou/Thankyou";

const Thank = () => {
    return(
        <div>
            <Helmet>
                <title>Cảm ơn quý khách - SneakerStudio</title>
            </Helmet>
            <Thankyou />
        </div>
    );
};

export default Thank;