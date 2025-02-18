import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        // Xác thực người dùng
        fetch("http://localhost:8080/auth/introspect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.result.valid || data.result.scope !== "ADMIN") {
                window.location.href = "/admin/404";
            }
        })
        .catch(() => window.location.href = "/admin/404");

        // Lấy số lượng sản phẩm
        fetch("http://localhost:8080/product/count", {
            method: "GET",
            headers: { "Author": `Bearer ${token}` }
        })
        .then(res => res.text())
        .then(setProductCount);
        console.log(setProductCount);
        

        // Lấy số lượng đơn hàng
        fetch("http://localhost:8080/order/count", {
            method: "GET",
            headers: { "Author": `Bearer ${token}` }
        })
        .then(res => res.text())
        .then(setOrderCount);

        // Lấy số lượng người dùng
        fetch("http://localhost:8080/user/count", {
            method: "GET",
            headers: { "Author": `Bearer ${token}` }
        })
        .then(res => res.text())
        .then(setUserCount);
    }, [token]);

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Trang Chủ</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin">Trang Chủ</a></li>
                    </ul>
                </div>
            </div>

            <ul className="box-info">
                <li>
                    <i className="bx bxs-calendar-check"></i>
                    <span className="text">
                        <h3 className="number-product">{productCount}</h3>
                        <p>Sản Phẩm</p>
                    </span>
                </li>
                <li>
                    <i className="bx bxs-group"></i>
                    <span className="text">
                        <h3 className="number-user">{userCount}</h3>
                        <p>Người Dùng</p>
                    </span>
                </li>
                <li>
                    <i className="bx bxs-dollar-circle"></i>
                    <span className="text">
                        <h3 className="number-order">{orderCount}</h3>
                        <p>Đơn Hàng</p>
                    </span>
                </li>
            </ul>
        </main>
    );
};

export default Dashboard;
