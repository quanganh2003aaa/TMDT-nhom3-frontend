import React from "react";
import './feature.css'

const Feature = () => {
  const features = [
    { img: "./images/f1.png", title: "Miễn phí ship" },
    { img: "./images/f2.png", title: "Đặt hàng online" },
    { img: "./images/f3.png", title: "Tiết kiệm" },
    { img: "./images/f4.png", title: "Khuyến mãi" },
    { img: "./images/f5.png", title: "Mua bán uy tín" },
    { img: "./images/f6.png", title: "Hỗ trợ" },
  ];

  return (
    <section id="feature" className="section-p1">
      {features.map((feature, index) => (
        <div className="fe-box" key={index}>
          <img src={feature.img} alt={feature.title} />
          <h6>{feature.title}</h6>
        </div>
      ))}
    </section>
  );
};

export default Feature;
