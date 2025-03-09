import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css"; 

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
  }, []);

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

  const handleUserNavigation = () => {
    const idUser = sessionStorage.getItem("idUser");
    if (idUser) {
      navigate("/pay");
    } else {
      alert("Bạn cần đăng nhập trước!");
      navigate("/login");
    }
  };

  return (
    <section className="cart-page-container">
      <div className="cart-page-header">
        <h2>Giỏ Hàng</h2>
      </div>

      <div className="cart-page-content">
        <table className="cart-page-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Size</th>
              <th>Số Lượng</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`images/product/${item.img}`}
                      alt={item.name}
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
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

        <div className="cart-page-total">
          <p>
            Tổng Tiền:{" "}
            <span>{totalPrice.toLocaleString()} VND</span>
          </p>
        </div>

        <div className="cart-page-actions">
          <button className="btn btn-primary" onClick={handleUserNavigation}>
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
