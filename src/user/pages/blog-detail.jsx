import React from "react";
import { Helmet } from "react-helmet";
import Body from "../components/blog/blogdetail";

const Blog = () => {
    return(
        <div>
            <Helmet>
                <title>Chi Tiết Tin tức - SneakerStudio</title>
            </Helmet>
            <Body />
        </div>
    );
};

export default Blog;