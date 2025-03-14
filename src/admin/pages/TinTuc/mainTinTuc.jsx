import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Product from "../../components/tintuc/mainTinTuc";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="conTent">
        <Navbar />
        <Product />
      </section>
    </section>
  );
};

export default AdminPage;
