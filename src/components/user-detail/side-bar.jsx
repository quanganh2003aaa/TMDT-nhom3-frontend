import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './UserDetail.css'

const Body = () => {
  const navigate = useNavigate();
  const isActive = (paths) => paths.includes(location.pathname);
  const location = useLocation();


  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUser");
    window.location.href = "/login";
  };

  return(
    <div className="udetail-sidebar">
        <div className={`udetail-sidebar-item ${isActive(["/user-detail"]) ? "udetail-sidebar-active" : ""}`} >
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