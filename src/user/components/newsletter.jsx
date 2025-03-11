import React from "react";
import './newsletter.css'

const Newsletter = () => {
  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="newstext">
        <h4>Đăng Ký Để Nhận Thông Tin Mới Nhất</h4>
        <p>
          Nhập E-mail cập nhật về cửa hàng mới nhất và{" "}
          <span>ưu đãi đặc biệt</span> của chúng tôi.
        </p>
      </div>
      <div className="form">
        <input type="text" placeholder="Nhập E-mail của bạn" />
        <button className="normal">Đăng Ký</button>
      </div>
    </section>
  );
};

export default Newsletter;
