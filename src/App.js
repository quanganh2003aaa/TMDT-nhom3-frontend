import React, { useState } from "react";
import './user/css/style.css';
import './user/css/style1.css';
import { BrowserRouter as Navigate, Routes, Route } from "react-router-dom";
import Header from './user/components/header'
import Footer from './user/components/footer'
import Cart from "./user/components/Cart";
import Accessories from "./user/pages/accessories";
import Home from "./user/pages/home";
import ProductList from "./user/pages/product-list";
import SneakerList from "./user/pages/sneaker";
import ClothesList from "./user/pages/clothes";
import BrandsList from "./user/pages/brand";
import Blog from "./user/pages/blog";
import Vouchers from "./user/pages/voucher";
import Contact from "./user/pages/contact";
import ProductDetailPage from "./user/pages/sproduct";
import Login from "./user/pages/login";
import UserDetails from "./user/pages/userdetail";
import UserDetailsHistory from "./user/pages/userdetail-history";
import UserDetailsComment from "./user/pages/userdetail-comment";
import UserDetailsRate from "./user/pages/userdetail-rate";
import UserDetailsOrder from "./user/pages/OrderDetail";
import Pay from "./user/pages/pay";
import Thankyou from "./user/pages/thankyou";

function App() {
    const [isCartVisible, setCartVisible] = useState(false);

    const handleCartClick = () => {
      setCartVisible(true);
    };

    const handleCloseCart = () => {
      setCartVisible(false);
    };
    
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/sneaker" element={<SneakerList />} />
          <Route path="/clothes" element={<ClothesList />} />
          <Route path="/brands" element={<BrandsList />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/voucher" element={<Vouchers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sproduct" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-detail" element={<UserDetails />} />
          <Route path="/user-detail/history" element={<UserDetailsHistory />} />
          <Route path="/user-detail/comment" element={<UserDetailsComment />} />
          <Route path="/user-detail/rate" element={<UserDetailsRate />} />
          <Route path="/user-detail/order-detail/:id" element={<UserDetailsOrder />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
