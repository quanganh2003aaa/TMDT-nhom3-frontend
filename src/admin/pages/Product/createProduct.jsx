import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Create from "../../components/product/CreateProduct";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <Create />
      </section>
    </section>
  );
};

export default AdminPage;