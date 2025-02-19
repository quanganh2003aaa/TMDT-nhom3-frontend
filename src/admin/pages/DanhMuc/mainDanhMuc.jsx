import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Product from "../../components/danhmuc/mainDanhMuc";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <Product />
      </section>
    </section>
  );
};

export default AdminPage;
