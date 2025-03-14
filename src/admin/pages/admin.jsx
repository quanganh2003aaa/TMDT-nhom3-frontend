import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Homes from "../components/admin/Admin";
import '../css/Admin.css'

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="conTent">
        <Navbar />
        <Homes />
      </section>
    </section>
  );
};

export default AdminPage;
