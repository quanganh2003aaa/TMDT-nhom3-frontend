import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart data from sessionStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(sessionStorage.getItem("cart")) || {
        detailOrderRequestList: [],
        totalPrice: 0,
      };
      setCartItems(storedCart.detailOrderRequestList || []);
      setTotalPrice(storedCart.totalPrice || 0);
    };
    loadCart();
  }, [isVisible]);

  // Remove an item from the cart
  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1);

    const newTotalPrice =
      totalPrice - removedItem[0].price * removedItem[0].quantity;
    setCartItems(updatedCart);
    setTotalPrice(newTotalPrice);

    sessionStorage.setItem(
      "cart",
      JSON.stringify({
        detailOrderRequestList: updatedCart,
        totalPrice: newTotalPrice,
      })
    );
  };

  // Hàm kiểm tra idUser trong sessionStorage
  const handleUserNavigation = () => {
    const idUser = sessionStorage.getItem("idUser");
    if (idUser) {
      navigate("/pay"); // Chuyển tới trang thanh toán
    } else {
      alert("Bạn cần đăng nhập trước!"); // Hiển thị thông báo
      navigate("/login"); // Chuyển tới trang login
    }
  };

  return (
    <section className={`cart ${isVisible ? "show" : ""}`} id="cart">
      <i className="fa-solid fa-xmark" id="close-cart" onClick={onClose}></i>
      <h2 className={"cartH2"}>Giỏ Hàng</h2>
      <div id="cart-index">
        <table className="table" id="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Size</th>
              <th>Số Lượng</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody id="list-cart">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`images/product/${item.img}`}
                      alt={item.name}
                      style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                      style={{backgroundColor: "red"}}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Giỏ hàng hiện tại trống.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="price-total"
        id="price-total"
        style={{ textAlign: "right", padding: "0 15px" }}
      >
        <p style={{ fontWeight: "bold", color: "black" }}>
          Tổng Tiền:{" "}
          <span style={{ color: "green" }}>
            {totalPrice.toLocaleString()} VND
          </span>
        </p>
      </div>
      <a href="" onClick={handleUserNavigation}>
        <button className="btn-pay">Tiến hành thanh toán</button>
      </a>
    </section>
  );
};

export default Cart;
