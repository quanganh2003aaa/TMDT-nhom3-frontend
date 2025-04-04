import React from "react";
import { Helmet } from "react-helmet";
import Rate from "../components/user-detail/rate";

const UserDetails = () => {
    return(
        <div>
            <Helmet>
                <title>Chi tiết người dùng - SneakerStudio</title>
            </Helmet>
            <Rate />
        </div>
    );
};

export default UserDetails;