import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Product from "../components/product/Product";
import '../css/Admin.css'

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
