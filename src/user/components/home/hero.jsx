import React from "react";
import './hero.css'

const Hero = () => {
  return (
    <section id="hero_1">
      <div className="content">
        <h4 style={{ fontSize: "50px" }}>Khuyến Mại</h4>
        <h2 style={{ fontSize: "60px" }}>Ưu Đãi Giá Trị Khủng</h2>
        <h1 style={{ fontSize: "80px" }}>Cho Tất Cả Sản Phẩm</h1>
        <p style={{ fontSize: "40px", color: "black" }}>
          Các Bộ Sưu Tập Giảm Tới 70%
        </p>
        <button style={{ fontSize: "30px" }}>
          <a href="shoses.html" style={{ fontSize: "30px" }}>
            Mua Ngay
          </a>
        </button>
      </div>
    </section>
  );
};

export default Hero;
