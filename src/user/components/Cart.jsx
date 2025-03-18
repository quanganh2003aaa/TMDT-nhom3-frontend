import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css"; 

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const idUser = sessionStorage.getItem("idUser");
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

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/delete/${productId}`);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
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
                  <td style={{ textAlign: "center", verticalAlign: "middle", paddingLeft:"20px" }}>
                    <img
                      src={`images/product/1004184-1A02718-2X04V.png`}
                      alt={item.name}
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()}đ VND</td>
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
