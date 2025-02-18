import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Voucher from "../../components/voucher/mainVoucher";

const AdminPage = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <Voucher />
      </section>
    </section>
  );
};

export default AdminPage;