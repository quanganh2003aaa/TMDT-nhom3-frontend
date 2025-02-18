import React from "react";

const Cart = () => {
  return (
    <section className="cart" id="cart">
      <i className="fa-solid fa-xmark" id="close-cart"></i>
      <h2 style={{ marginTop: "-70px", marginBottom: "100px" }}>Giỏ Hàng</h2>
      <div id="cart-index">
        <table className="table" id="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th style={{ marginLeft: "10px" }}>Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Size</th>
              <th>Số Lượng</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody id="list-cart"></tbody>
        </table>
      </div>
      <div
        className="price-total"
        id="price-total"
        style={{ textAlign: "right", padding: "0 15px" }}
      ></div>
      <a href="pay.html">
        <button className="btn-pay">Tiến hành thanh toán</button>
      </a>
    </section>
  );
};

export default Cart;
