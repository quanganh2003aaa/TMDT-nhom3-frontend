import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Update from "../../components/product/UpdateProduct";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="conTent">
        <Navbar />
        <Update />
      </section>
    </section>
  );
};

export default AdminPage;