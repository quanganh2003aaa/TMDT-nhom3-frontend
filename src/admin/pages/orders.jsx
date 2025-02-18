import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Orders from "../components/orders/Oder";
import '../css/Admin.css'

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <Orders />
      </section>
    </section>
  );
};

export default AdminPage;
