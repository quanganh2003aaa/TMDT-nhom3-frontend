import React, { useEffect, useState } from "react";
import './contact.css'
import axios from "axios";

const Body = () => {
  const [store, setStore] = useState([]);

  const fetchStore = () => {
    axios
      .get("http://localhost:8080/api/store/getAll")
      .then((response) => {
          setStore(response.data.result);
      })
      .catch((error) => {
        console.log("Lỗi fetch cửa hàng: ", error.response.data.message);
      })
  }

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <section id="contact-details" className="section-p1">
      <div className="details">
        <img src="./images/contact_2.png" alt="Contact" style={{width:"100%"}}/>
        <br />
        <span>
          Sneaker Studio international được thành lập từ năm 2015, là chuỗi bán lẻ Sneaker, Streetwear và phụ kiện thời trang
          chính hãng có thị phần số 1 Việt Nam với số lượt truy cập mua hàng tại website sneakerstudio.com lên tới trên 10.000
          lượt mỗi ngày từ khắp 63 tỉnh thành trên cả nước.
        </span>

        {store.map((store, index) => (
          <div key={index +1}>
            <h3>Cửa hàng {index +1}</h3>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <p>{store.address}</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>{store.tel}</p>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>Service@SneakerStudio.com</p>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4536.612334456416!2d105.79150230854152!3d20.97924202211569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1742570071281!5m2!1svi!2s" 
        style={{width:"600",
          height:"405",
          border:"0",
        }}/>
      </div>
    </section>
  );
};

export default Body;
