import React from "react";
import { Helmet } from "react-helmet";
import OrderDetail from "../components/user-detail/OrderDetail";

const UserDetails = () => {
    return(
        <div>
            <Helmet>
                <title>Chi tiết đơn hàng - SneakerStudio</title>
            </Helmet>
            <OrderDetail />
        </div>
    );
};

export default UserDetails;