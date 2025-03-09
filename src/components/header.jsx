import React, { useState } from "react";
import './header.css';
import { Link, useNavigate, useLocation} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isActive = (paths) => paths.includes(location.pathname);
  const location = useLocation();

  const [searchText, setSearchText] = useState("");

  // Hàm điều hướng và cuộn về đầu trang
  const handleNavigation = (url) => {
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn về đầu trang
  };

  // Hàm kiểm tra idUser trong sessionStorage
  const handleUserNavigation = () => {
    const idUser = sessionStorage.getItem("idUser");
    if (idUser) {
      navigate("/user-detail"); // Chuyển tới trang user-detail
    } else {
      alert("Bạn cần đăng nhập trước!"); // Hiển thị thông báo
      navigate("/login"); // Chuyển tới trang login
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang mặc định của form
    if (searchText.trim()) {
      window.location.href = `/product-list?query=${encodeURIComponent(searchText)}`;
    }
  };

  const onCartClick = () =>{
    navigate("/cart");
  }

  return (
    <section id="header">
      <Link to="/home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src="./images/logo_s.png" className="logo" style={{ width: "180px" }} alt="Logo" />
      </Link>

      <div>
        <ul id="navbar">
          <li>
          <Link className={isActive(["/home"]) ? "active" : ""} to="/home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link
              className={isActive(["/product-list", "/sneaker", "/clothes", "/accessories", "/brands"]) ? "active" : ""}
              to="/product-list"
              onClick={() => handleNavigation("/product-list")}
            >
              SẢN PHẨM
            </Link>
            <ul className="drop-menu">
              <li>
                <a href="/sneaker" onClick={() => handleNavigation("/sneaker")}>GIÀY</a>
              </li>
              <li>
                <a href="/clothes" onClick={() => handleNavigation("/clothes")}>QUẦN ÁO</a>
              </li>
              <li>
                <a href="/accessories" onClick={() => handleNavigation("/accessories")}>PHỤ KIỆN</a>
              </li>
              <li>
                <a href="/brands" onClick={() => handleNavigation("/brands")}>THƯƠNG HIỆU</a>
              </li>
            </ul>
          </li>
          <li>
            <Link
                className={isActive(["/blog"]) ? "active" : ""}
                to="/blog"
                onClick={() => handleNavigation("/blog")}
              >
                TIN TỨC
              </Link>
          </li>
          <li>
            <Link
                className={isActive(["/voucher"]) ? "active" : ""}
                to="/voucher"
                onClick={() => handleNavigation("/voucher")}
              >
                KHUYẾN MÃI
              </Link>
          </li>
          <li>
            <Link
                className={isActive(["/contact"]) ? "active" : ""}
                to="/contact"
                onClick={() => handleNavigation("/contact")}
              >
                LIÊN HỆ
              </Link>
          </li>
          <li id="lg-user">
            <a href="" onClick={handleUserNavigation}>
              <i className="fa-solid fa-user"></i>
            </a>
          </li>
          <li id="lg-glass">
            <form action="" className="search-form" onSubmit={handleSearch}>
              <input type="text" placeholder="Tìm kiếm..." value={searchText}
                onChange={(e) => setSearchText(e.target.value)} name="query" />
              <button type="submit" title="Search" className="btn-search" >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </li>
          <li id="lg-bag">
            <div className="navbar-cart-icon" onClick={onCartClick}>
              <i className="fa-solid fa-shopping-cart"></i>
              <span id="cart-notification" className="notification-badge">0</span>
            </div>
          </li>
          <a href="#" id="close"><i className="fa-solid fa-xmark"></i></a>
        </ul>
      </div>
    </section>
  );
};

export default Header;
