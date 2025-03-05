import React from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/home/hero";
import Feature from "../components/home/feature";
import ProductHighlight from "../components/home/productHighlight";
import Banner from "../components/home/banner";
import NewProducts from "../components/home/newproduct";
import SmallBanner from "../components/home/smallBanner";
import Banner3 from "../components/home/banner3";
import Newsletter from "../components/newsletter";

const Home = () => {
    return(
        <div>
            <Helmet>
                <title>Trang chủ - SneakerStudio</title>
            </Helmet>
            <Hero />
            <Feature />
            {/* <ProductHighlight /> */}
            <Banner />
            <NewProducts />
            <SmallBanner />
            <Banner3 />
            <Newsletter />
        </div>
    );
};

export default Home;