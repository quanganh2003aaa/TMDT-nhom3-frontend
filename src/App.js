import React, { useState } from "react";
import './css/style.css';
import './css/style1.css';
import { BrowserRouter as Navigate, Routes, Route } from "react-router-dom";
import Header from './components/header'
import Footer from './components/footer'
import Cart from "./components/Cart";
import Accessories from "./pages/accessories";
import Home from "./pages/home";
import ProductList from "./pages/product-list";
import SneakerList from "./pages/sneaker";
import ClothesList from "./pages/clothes";
import BrandsList from "./pages/brand";
import Blog from "./pages/blog";
import Vouchers from "./pages/voucher";
import Contact from "./pages/contact";
import ProductDetailPage from "./pages/sproduct";
import Login from "./pages/login";
import UserDetails from "./pages/userdetail";
import UserDetailsHistory from "./pages/userdetail-history";
import UserDetailsComment from "./pages/userdetail-comment";
import UserDetailsRate from "./pages/userdetail-rate";
import UserDetailsOrder from "./pages/OrderDetail";
import Pay from "./pages/pay";
import Thankyou from "./pages/thankyou";

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
