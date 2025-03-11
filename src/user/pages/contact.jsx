import React from "react";
import { Helmet } from "react-helmet";
import Body from "../components/contact/body";

const Accessories = () => {
    return(
        <div>
            <Helmet>
                <title>Liên hệ - SneakerStudio</title>
            </Helmet>
            <section id="page-header" className="contact-header" >
                <h1>Liên hệ</h1>
                <p>THÔNG TIN VỀ CỬA HÀNG CHÚNG TÔI</p>
            </section>
            <Body />
        </div>
    );
};

export default Accessories;