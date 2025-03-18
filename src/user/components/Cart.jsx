import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css"; 

const Cart = () => {
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (!idUser) {
        alert("Bạn cần đăng nhập để xem giỏ hàng!");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/cart/getByUser/${idUser}`);
        const fetchedCart = response.data.result.productCartDTOList || [];
        setCartItems(fetchedCart);
        setTotalPrice(response.data.result.totalPrice);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng từ API:", error);
      }
    };

    fetchCart();
  }, [navigate]);

  const removeItem = async (idCart) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/delete`, {
        params: { idUser: idUser, idCart: idCart }
      });
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.response.data.message);
    }
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
                  <td >
                    <img
                      src={`images/product/${item.img}`}
                      alt={item.name}
                      style={{ display: "block",
                        margin: "0 auto",
                        width: "80%", 
                        height: "80px", 
                        objectFit: "contain"}}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()}đ VND</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
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
