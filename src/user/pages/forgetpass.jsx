import React from "react";
import { Helmet } from "react-helmet";
import Body from "../components/login/ForgetPass";

const Forget = () => {
    return(
        <div>
            <Helmet>
                <title>Quên mật khẩu - SneakerStudio</title>
            </Helmet>
            <Body />
        </div>
    );
};

export default Forget;