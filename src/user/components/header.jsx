import React, { useState, useEffect } from "react";
import axios from "axios";
import './header.css';
import { Link, useNavigate, useLocation} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState([]);

  const isActive = (paths) => paths.includes(location.pathname);

  const handleNavigation = (url) => {
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const handleUserNavigation = () => {
    const idUser = sessionStorage.getItem("idUser");
    if (idUser) {
      navigate("/user-detail"); 
    } else {
      navigate("/login"); 
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchText.trim()) {
      window.location.href = `/product-list?query=${encodeURIComponent(searchText)}`;
    }
  };

  const onCartClick = () =>{
    navigate("/cart");
  }

  useEffect(() => {
    const idUser = sessionStorage.getItem("idUser");
    if (idUser) {
      axios
        .get(`http://localhost:8080/api/cart/getByUser/${idUser}`)
        .then((response) => {
          if (response.data.result && response.data.result.productCartDTOList) {
            setCartItems(response.data.result.productCartDTOList);
            setTotalPrice(response.data.result.totalPrice)
          } else {
            setCartItems([]); 
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setCartItems([]);
        });
    }
  }, []);

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
          <li id="lg-bag" onClick={onCartClick}>
            <div className="cart-container">
              <div className="notification-cart">
                <span className="num-cart">{cartItems.length}</span>
                <div className="navbar-cart-icon">
                  <i className="fa-solid fa-shopping-cart"></i>
                </div>
              </div>
              
              <div className="cart-dropdown">
                {cartItems.length > 0 ? (
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        <img src={`images/product/${item.img}`} alt="Product Image" />
                        <div>
                          <p>ID: {item.id}</p>
                          <p>Size: {item.size}</p>
                          <p>Số lượng: {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                    <h6 style={{fontSize:"15px", paddingTop:"10px"}}>Tổng tiền: {TotalPrice}</h6>
                  </ul>
                ) : (
                  <p>Giỏ hàng trống</p>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
