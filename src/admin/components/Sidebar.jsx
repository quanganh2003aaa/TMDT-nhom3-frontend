import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  
  const isActive = (paths) => paths.includes(location.pathname);
  const location = useLocation();

  const handleNavigation = (url) => {
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn về đầu trang
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUser");
    window.location.href = "/login";
  };

  return (
    <section id="sidebar">
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">SneakerStudio</span>
      </a>
      <ul className="side-menu top">
        <li className={isActive(["/admin/admin"]) ? "active" : ""} >
          <Link to="/admin/admin" onClick={() => handleNavigation("/admin/admin")}>
            <i className="bx bxs-dashboard"></i>
            <span className="text">Trang Chủ</span>
          </Link>
        </li>
        <li className={isActive(["/admin/products"]) ? "active" : ""}>
          <Link to="/admin/products" onClick={() => handleNavigation("/admin/products")}>
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">Sản Phẩm</span>
          </Link>
        </li>
        <li className={isActive(["/admin/revenue"]) ? "active" : ""}>
          <Link to="/admin/revenue" onClick={() => handleNavigation("/admin/revenue")}>
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Doanh Thu</span>
          </Link>
        </li>
        <li className={isActive(["/admin/orders"]) ? "active" : ""}>
          <Link to="/admin/orders" onClick={() => handleNavigation("/admin/orders")}>
            <i className="bx bxs-message-dots"></i>
            <span className="text">Đơn Hàng</span>
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text" onClick={handleLogout}>Đăng Xuất</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
