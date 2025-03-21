import React from "react";
import { Helmet } from "react-helmet";
import Wrapper from "../components/login/Wrapper";

const Login = () => {
    return(
        <div>
            <Helmet>
                <title>Login - SneakerStudio</title>
            </Helmet>
            <Wrapper />
        </div>
    );
};

export default Login;