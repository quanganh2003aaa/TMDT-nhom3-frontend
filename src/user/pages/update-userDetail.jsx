import React from "react";
import { Helmet } from "react-helmet";
import Update from "../components/user-detail/UpdateUserDetail";

const UserDetails = () => {
    return(
        <div>
            <Helmet>
                <title>Sửa chi tiết người dùng - SneakerStudio</title>
            </Helmet>
            <Update />
        </div>
    );
};

export default UserDetails;