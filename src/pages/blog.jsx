import React from "react";
import { Helmet } from "react-helmet";
import Body from "../components/blog/body";

const Accessories = () => {
    return(
        <div>
            <Helmet>
                <title>Tin tức - SneakerStudio</title>
            </Helmet>
            <section id="page-header" className="blog-header" style={{ backgroundImage: `url('/images/contact_1.png')` }}>
                <h1>Đọc thêm</h1>
                <p>Những thông tin mới nhất về sản phẩm của chúng tôi</p>
            </section>
            <Body />
        </div>
    );
};

export default Accessories;