import React from "react";
import { Helmet } from "react-helmet";
import UserDetail from "../components/user-detail/rate";

const UserDetails = () => {
    return(
        <div>
            <Helmet>
                <title>Chi tiết người dùng - SneakerStudio</title>
            </Helmet>
            <UserDetail />
        </div>
    );
};

export default UserDetails;