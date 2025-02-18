import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RevenueChart from "../components/revenue/reve";
import '../css/Admin.css'

const Dashboard = () => {
  return (
    <section id="admin-page">
      <Sidebar />
      <section id="content">
        <Navbar />
        <RevenueChart />
      </section>
    </section>
  );
};

export default Dashboard;
