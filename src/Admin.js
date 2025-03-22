import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./admin/css/Admin.css"
import Loi from "./admin/pages/404";
import Home from "./admin/pages/admin";

import Banner from "./admin/pages/Banner/banner";
import CreateBanner from "./admin/pages/Banner/createBanner";
import UpdateBanner from "./admin/pages/Banner/updateBanner";

import DanhMuc from "./admin/pages/DanhMuc/mainDanhMuc";
import CreateDanhMuc from "./admin/pages/DanhMuc/createDanhMuc";
import UpdateDanhMuc from "./admin/pages/DanhMuc/updateDanhMuc";

import Deliver from "./admin/pages/Deliver/mainDeli";
import CreateDeliver from "./admin/pages/Deliver/createDeli";
import UpdateDeliver from "./admin/pages/Deliver/updateDeli";

import Refund from "./admin/pages/Refund/mainRefund";

import Shop from "./admin/pages/Shop/mainShop";
import CreateShop from "./admin/pages/Shop/createShop";
import UpdateShop from "./admin/pages/Shop/updateShop";

import ThuongHieu from "./admin/pages/ThuongHieu/mainThuongHieu";
import CreateThuongHieu from "./admin/pages/ThuongHieu/createThuongHieu";
import UpdateThuongHieu from "./admin/pages/ThuongHieu/updateThuongHieu";

import TinTuc from "./admin/pages/TinTuc/mainTinTuc";
import CreateTinTuc from "./admin/pages/TinTuc/createTinTuc";
import UpdateTinTuc from "./admin/pages/TinTuc/updateTinTuc";

import Users from "./admin/pages/User/user";
import UpdateUsers from "./admin/pages/User/updateUser";
import CreateUsers from "./admin/pages/User/createUser";

import Orders from "./admin/pages/Order/orders";

import Products from "./admin/pages/Product/product";
import CreateProduct from "./admin/pages/Product/createProduct";
import UpdateProduct from "./admin/pages/Product/updateProduct";

import Voucher from "./admin/pages/Voucher/voucher";
import CreateVoucher from "./admin/pages/Voucher/createVoucher";
import UpdateVoucher from "./admin/pages/Voucher/updateVoucher";

import Revenue from "./admin/pages/Revenue/revenue";

function Admins() {
  return (
    <div className="admin">
        <Routes>
            <Route path="/404" element={<Loi />} />
            <Route path="/admin" element={<Home />} />

            <Route path="/banner" element={<Banner />} />
            <Route path="/create-banner" element={<CreateBanner />} />
            <Route path="/update-banner" element={<UpdateBanner />} />

            <Route path="/danhmuc" element={<DanhMuc />} />
            <Route path="/create-danhmuc" element={<CreateDanhMuc />} />
            <Route path="/update-danhmuc/:idCate" element={<UpdateDanhMuc />} />

            <Route path="/deliver" element={<Deliver />} />
            <Route path="/create-deliver" element={<CreateDeliver />} />
            <Route path="/update-deliver/:idDeli" element={<UpdateDeliver />} />

            <Route path="/refund" element={<Refund />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/create-shop" element={<CreateShop />} />
            <Route path="/update-shop/:idStore" element={<UpdateShop />} />

            <Route path="/thuonghieu" element={<ThuongHieu />} />
            <Route path="/create-thuonghieu" element={<CreateThuongHieu />} />
            <Route path="/update-thuonghieu/:idThuongHieu" element={<UpdateThuongHieu />} />

            <Route path="/tintuc" element={<TinTuc />} />
            <Route path="/create-tintuc" element={<CreateTinTuc />} />
            <Route path="/update-tintuc/:idTintuc" element={<UpdateTinTuc />} />

            <Route path="/user" element={<Users />} />
            <Route path="/create-user" element={<CreateUsers />} />
            <Route path="/update-user/:idUser" element={<UpdateUsers />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/products" element={<Products />} />
            <Route path="/create-products" element={<CreateProduct />} />
             <Route path="/update-product/:idProduct" element={<UpdateProduct />} />

            <Route path="/voucher" element={<Voucher />} />
            <Route path="/create-voucher" element={<CreateVoucher />} />
            <Route path="/update-voucher/:idVoucher" element={<UpdateVoucher />} />

            <Route path="/revenue" element={<Revenue />} />
        </Routes>
    </div>
  );
}

export default Admins;
