import React from "react";
import './smallBanner.css'

const SmallBanner = () => {
  return (
    <section id="sm-banner" className="section-p1">
      <div className="banner-box">
        <h4>Deal Nóng Hổi</h4>
        <h2>mua 1 tặng ngay 1</h2>
        <span>Bộ sưu tập giày bóng rổ Nike</span>
        <button className="white">Tìm Hiểu Thêm</button>
      </div>
      <div className="banner-box banner-box2">
        <h4>Thu Đông</h4>
        <h2>bộ sưu tập mới</h2>
        <span>Bộ sưu tập áo Stussy</span>
        <button className="white">Xem Ngay</button>
      </div>
    </section>
  );
};

export default SmallBanner;
