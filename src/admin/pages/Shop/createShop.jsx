import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Create from "../../components/shop/createShop";

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