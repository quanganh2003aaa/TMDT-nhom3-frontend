import React from "react";
import './contact.css'

const Body = () => {
  return (
    <section id="contact-details" className="section-p1">
      <div className="details">
        <img src="./images/contact_2.png" alt="Contact" />
        <br />
        <span>
          Sneaker Studio international được thành lập từ năm 2015, là chuỗi bán lẻ Sneaker, Streetwear và phụ kiện thời trang
          chính hãng có thị phần số 1 Việt Nam với số lượt truy cập mua hàng tại website sneakerstudio.com lên tới trên 10.000
          lượt mỗi ngày từ khắp 63 tỉnh thành trên cả nước.
        </span>
        <h3>Trụ sở chính</h3>
        <ul>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>P. Văn Quán, Hà Đông, Hà Nội, Việt Nam</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>088 xxxxx55</p>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>Service@SneakerStudio.com</p>
          </li>
        </ul>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.301142686791!2d105.78657997596889!3d20.980562389430897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1732463046224!5m2!1svi!2s"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Body;
