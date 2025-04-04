import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import './reve.css'

const RevenueChart = () => {
  const token = sessionStorage.getItem('token');
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/introspect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
  })
  .then(res => res.json())
  .then(data => {
      if (!data.result.valid || data.result.scope !== "ADMIN") {
          window.location.href = "/admin/404";
      }
  })
  .catch(() => window.location.href = "/admin/404");
    const fetchRevenueData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/revenue/getChart", {
          headers: {
            Author: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.result) {
          const revenues = response.data.result.map(item => item.revenue);
          const categories = response.data.result.map(item => `Tháng ${item.month}/${item.year}`);

          setChartData({
            series: [{ name: "Doanh thu", data: revenues }],
            options: {
              ...chartData.options,
              xaxis: { categories: categories },
            },
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      }
    };

    fetchRevenueData();
  }, []); 

  return (
    <main>
        <div className="head-title">
                <div className="left">
                    <h1>Doanh Thu</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/orders">Doanh Thu</a>
                        </li>
                    </ul>
                </div>
            </div>

        <div class="data">
            <div className="content-data">
                <div className="head">
                    <h3>Biểu đồ doanh thu 5 tháng gần nhất</h3>
                </div>
                <div className="chart">
                    <div id="chart">
                        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
                    </div>
                </div>
            </div>
        </div>
      
      
    </main>
  );
};

export default RevenueChart;
