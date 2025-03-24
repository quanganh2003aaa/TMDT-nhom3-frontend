import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './UserDetail.css'
import axios from "axios";

const Body = () => {
  const navigate = useNavigate();
  const isActive = (paths) => paths.includes(location.pathname);
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  const handleLogout = async () => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/logout", {token}, {
            headers: { 
                "Author": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) { 
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("idUser");
            window.location.href = "/login";
        } else {
            alert("Không thể đăng xuất. Vui lòng thử lại!");
        }
    } catch (error) {
        console.error("Lỗi đăng xuất:", error.response?.data?.message || error.message);
        alert("Đã xảy ra lỗi khi đăng xuất!");
    }
};

  return(
    <div className="udetail-sidebar">
        <div className={`udetail-sidebar-item ${isActive(["/user-detail","/user-detail/update"]) ? "udetail-sidebar-active" : ""}`} >
        <Link to="/user-detail">
            <h4>Thông tin người dùng</h4>
        </Link>
        </div>

        <div className={`udetail-sidebar-item ${isActive(["/user-detail/history"]) ? "udetail-sidebar-active" : ""}`} >
        <Link to="/user-detail/history">
            <h4>Lịch sử mua hàng</h4>
        </Link>
        </div>

        <div className={`udetail-sidebar-item ${isActive(["/user-detail/comment"]) ? "udetail-sidebar-active" : ""}`} >
        <Link to="/user-detail/comment">
            <h4>Bình luận</h4>
        </Link>
        </div>
        
        <div className={`udetail-sidebar-item ${isActive(["/user-detail/rate"]) ? "udetail-sidebar-active" : ""}`} >
        <Link to="/user-detail/rate">
            <h4>Đánh giá</h4>
        </Link>
        </div>

        <a onClick={handleLogout}>
        <div className={`udetail-sidebar-item ${isActive(["/user-detail/"]) ? "udetail-sidebar-active" : ""}`} >
            <h4>Đăng Xuất</h4>
        </div> 
        </a>
    </div>
  );
};

export default Body;