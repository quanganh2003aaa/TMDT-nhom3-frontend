import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./admin/css/Admin.css"
import Loi from "./admin/pages/404";
import Home from "./admin/pages/admin";
import Orders from "./admin/pages/orders";
import Products from "./admin/pages/product";
import Revenue from "./admin/pages/revenue";

function Admins() {
  return (
    <div className="admin">
        <Routes>
            <Route path="/404" element={<Loi />} />
            <Route path="/admin" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/revenue" element={<Revenue />} />
        </Routes>
    </div>
  );
}

export default Admins;
