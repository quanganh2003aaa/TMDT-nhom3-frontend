import React from "react";
import './user/css/style.css';
import './user/css/style1.css';
import { BrowserRouter as Navigate, Routes, Route } from "react-router-dom";
import Header from './user/components/header'
import Footer from './user/components/footer'
import Cart from "./user/components/Cart";
import Home from "./user/pages/home";
import ProductList from "./user/pages/product-list";
import Blog from "./user/pages/blog";
import BlogDetail from "./user/pages/blog-detail";
import Vouchers from "./user/pages/voucher";
import Contact from "./user/pages/contact";
import ProductDetailPage from "./user/pages/sproduct";
import Login from "./user/pages/login";
import Forgetpassword from "./user/pages/forgetpass";
import UserDetails from "./user/pages/userdetail";
import UserDetailsHistory from "./user/pages/userdetail-history";
import UserDetailsComment from "./user/pages/userdetail-comment";
import UserDetailsRate from "./user/pages/userdetail-rate";
import UserDetailsOrder from "./user/pages/OrderDetail";
import Refund from "./user/pages/refund";
import Rate from "./user/pages/rate";
import UpdateUserDetail from "./user/pages/update-userDetail";
import Pay from "./user/pages/pay";
import Thankyou from "./user/pages/thankyou";

function App() {    
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail/:idBlog" element={<BlogDetail />} />
          <Route path="/voucher" element={<Vouchers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sproduct" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/user-detail" element={<UserDetails />} />
          <Route path="/user-detail/history" element={<UserDetailsHistory />} />
          <Route path="/user-detail/comment" element={<UserDetailsComment />} />
          <Route path="/user-detail/rate" element={<UserDetailsRate />} />
          <Route path="/order-detail/:id" element={<UserDetailsOrder />} />
          <Route path="/refund/:idOrder" element={<Refund />} />
          <Route path="/rate/:idRate" element={<Rate />} />
          <Route path="/user-detail/update" element={<UpdateUserDetail />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
