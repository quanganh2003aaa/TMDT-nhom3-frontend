import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Update from "../../components/danhmuc/updateDanhMuc";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <Update />
      </section>
    </section>
  );
};

export default AdminPage;