import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Create from "../../components/thuonghieu/createThuongHieu";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="conTent">
        <Navbar />
        <Create />
      </section>
    </section>
  );
};

export default AdminPage;