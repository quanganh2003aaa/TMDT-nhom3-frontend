import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./admin/css/Admin.css"
import Loi from "./admin/pages/404";
import Home from "./admin/pages/admin";
import Users from "./admin/pages/User/user";
import UpdateUsers from "./admin/pages/User/updateUser";
import CreateUsers from "./admin/pages/User/createUser";
import Orders from "./admin/pages/orders";
import Products from "./admin/pages/Product/product";
import CreateProduct from "./admin/pages/Product/createProduct";
import UpdateProduct from "./admin/pages/Product/updateProduct";
import Voucher from "./admin/pages/Voucher/voucher";
import CreateVoucher from "./admin/pages/Voucher/createVoucher";
import UpdateVoucher from "./admin/pages/Voucher/updateVoucher";
import Revenue from "./admin/pages/revenue";

function Admins() {
  return (
    <div className="admin">
        <Routes>
            <Route path="/404" element={<Loi />} />
            <Route path="/admin" element={<Home />} />

            <Route path="/user" element={<Users />} />
            <Route path="/update-user" element={<UpdateUsers />} />
            <Route path="/create-user" element={<CreateUsers />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/products" element={<Products />} />
            <Route path="/create-products" element={<CreateProduct />} />
             <Route path="/update-product" element={<UpdateProduct />} /> {/* :idProduct */}

            <Route path="/voucher" element={<Voucher />} />
            <Route path="/create-voucher" element={<CreateVoucher />} />
            <Route path="/update-voucher" element={<UpdateVoucher />} />

            <Route path="/revenue" element={<Revenue />} />
        </Routes>
    </div>
  );
}

export default Admins;
