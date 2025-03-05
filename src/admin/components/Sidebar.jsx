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
          <Link to="/admin/admin" >
          <i className='bx bxs-home' ></i>
            <span className="text">Trang Chủ</span>
          </Link>
        </li>

        <li className={isActive(["/admin/user"]) ? "active" : ""}>
          <Link to="/admin/user" >
            <i className="bx bxs-user"></i>
            <span className="text">Người Dùng</span>
          </Link>
        </li>

        <li className={isActive(["/admin/products"]) ? "active" : ""}>
          <Link to="/admin/products" >
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">Sản Phẩm</span>
          </Link>
        </li>

        <li className={isActive(["/admin/revenue"]) ? "active" : ""}>
          <Link to="/admin/revenue" >
          <i className='bx bx-line-chart' ></i>
            <span className="text">Doanh Thu</span>
          </Link>
        </li>

        <li className={isActive(["/admin/danhmuc"]) ? "active" : ""}>
          <Link to="/admin/danhmuc" >
            <i className='bx bxs-purchase-tag'></i>
            <span className="text">Danh Mục</span>
          </Link>
        </li>

        <li className={isActive(["/admin/thuonghieu"]) ? "active" : ""}>
          <Link to="/admin/thuonghieu" >
           <i className='bx bxs-star' ></i>
            <span className="text">Thương Hiệu</span>
          </Link>
        </li>

        <li className={isActive(["/admin/tintuc"]) ? "active" : ""}>
          <Link to="/admin/tintuc" >
          <i className='bx bxs-news' ></i>
            <span className="text">Tin Tức</span>
          </Link>
        </li>

        <li className={isActive(["/admin/orders"]) ? "active" : ""}>
          <Link to="/admin/orders" >
            <i className="bx bxs-cart"></i>
            <span className="text">Đơn Hàng</span>
          </Link>
        </li>

        <li className={isActive(["/admin/voucher"]) ? "active" : ""}>
        <Link to="/admin/voucher" >
        <i className='bx bxs-discount'></i>
          <span className="text">Mã Giảm Giá</span>
        </Link>
      </li>

      <li className={isActive(["/admin/deliver"]) ? "active" : ""}>
        <Link to="/admin/deliver" >
        <i className='bx bxs-package' ></i>
          <span className="text">Hình Thức Giao Hàng</span>
        </Link>
      </li>

      <li className={isActive(["/admin/banner"]) ? "active" : ""}>
        <Link to="/admin/banner" >
        <i className='bx bxs-image-alt'></i>
          <span className="text">Banner Quảng Cáo</span>
        </Link>
      </li>

      <li className={isActive(["/admin/shop"]) ? "active" : ""}>
        <Link to="/admin/shop" >
        <i className='bx bxs-store' ></i>
          <span className="text">Cửa Hàng</span>
        </Link>
      </li>

      <li className={isActive(["/admin/refund"]) ? "active" : ""}>
        <Link to="/admin/refund" >
        <i className='bx bxs-flag-alt' ></i>
          <span className="text">Yêu Cầu Hoàn Trả</span>
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
