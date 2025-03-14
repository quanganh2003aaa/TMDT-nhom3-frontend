import React, { useEffect, useState } from "react";
import axios from "axios";
import './pay.css'

const CheckoutComponent = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const idUser = sessionStorage.getItem("idUser")

  const fetchCart = () => {
    axios
    .get(
      `http://localhost:8080/api/cart/getByUser/${idUser}`
    )
    .then((response) => setCart(response.data.result))
    .catch((error) => console.error("Lỗi lấy ra cart:", error.response.data.message));
  }

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Lỗi fetch city:", error));

    fetchCart();
  }, []);

  useEffect(() => {
    // Reset districts and wards when the city changes
    setDistricts([]);
    setWards([]);
    if (selectedCity) {
      const city = cities.find((city) => city.Id === selectedCity);
      if (city) setDistricts(city.Districts);
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    setWards([]);
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Id === selectedDistrict
      );
      if (district) setWards(district.Wards);
    }
  }, [selectedDistrict, districts]);

  const handlePayment = () => {
    if (!selectedCity || !selectedDistrict || !selectedWard || !paymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán.");
      return;
    }

    const paymentInfo = {
      user: sessionStorage.getItem("idUser"),
      tel: document.getElementById("tel-user").value,
      address: `${document.getElementById("number-address").value}, ${document.getElementById("ward").options[document.getElementById("ward").selectedIndex].text}, ${document.getElementById("district").options[document.getElementById("district").selectedIndex].text}, ${document.getElementById("city").options[document.getElementById("city").selectedIndex].text}`,
      note: document.querySelector("textarea").value,
      detailOrderRequestList: cart?.detailOrderRequestList.map((item) => ({
        id: item.idProduct,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    const token = sessionStorage.getItem("token");

    if (paymentMethod === "cash") {
      axios
        .post("http://localhost:8080/order/create", paymentInfo, {
          headers: { Author: `Bearer ${token}` },
        })
        .then(() => {
          alert("Thanh toán thành công!");
          window.location.href = "/thankyou";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Thanh toán thất bại!");
        });
    } else if (paymentMethod === "vnpay") {
      axios
        .post(
          `http://localhost:8080/vnpay/create?amount=${cart.totalPrice}`,
          paymentInfo,
          { headers: { Author: `Bearer ${token}` } }
        )
        .then((response) => {
          window.location.href = response.data.result;
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="container-pay section-p1">
      <div className="item-flex">
        <section className="checkout">
          <h2 className="section-heading">Thông Tin Chi Tiết</h2>
          <div className="payment-form">
            <div className="payment-method">
              <button
                className={`method ${paymentMethod === "cash" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                <i className="fa-solid fa-coins"></i>
                <span>Tiền Mặt</span>
                <i
                className={`fa-solid fa-circle-check checkmark ${
                    paymentMethod === "cash" ? "fill" : ""
                }`}
                ></i>
              </button>
              <button
                className={`method ${
                  paymentMethod === "vnpay" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("vnpay")}
              >
                <i className="fa-solid fa-credit-card"></i>
                <span>VNPay</span>
                <i
                className={`fa-solid fa-circle-check checkmark ${
                    paymentMethod === "vnpay" ? "fill" : ""
                }`}
                ></i>
              </button>
            </div>

            <form id="form-checkout" className="row">
              <div className="cardholder-name">
                <label className="label-default">Tên:</label>
                <input type="text" id="name-user" className="input-default" />
              </div>
              <div className="cardholder-name">
                <label className="label-default">Số Điện Thoại:</label>
                <input
                  type="tel"
                  id="tel-user"
                  className="input-default"
                  pattern="(0)[1-9]{1}[0-9]{8}"
                />
              </div>
              <div className="cardholder-name">
                <label className="label-default">Địa chỉ:</label>
              </div>
              <div className="cardholder-name col-6">
                <select
                  className="form-select select-address"
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Chọn tỉnh thành</option>
                  {cities.map((city) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select select-address"
                  id="ward"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                >
                  <option value="">Chọn phường xã</option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Id}>
                      {ward.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cardholder-name col-6">
                <select
                  className="form-select select-address"
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Chọn quận huyện</option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Id}>
                      {district.Name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="number-address"
                  className="input-default"
                  placeholder="Số nhà..."
                />
              </div>
              <div className="card-number">
                <label className="label-default">Ghi Chú:</label>
                <textarea
                  id="note"
                  className="input-default"
                  rows="3"
                  style={{ padding: "10px 15px" }}
                ></textarea>
              </div>
            </form>
          </div>
        </section>

        <div className="container-pay-product">
          <div className="order-container">
            {cart?.productCartDTOList.map((item) => (
              <div key={item.idProduct} className="order-item">
                <img
                  src={`images/product/${item.img}`}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-info">
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>
                    Số Lượng: {item.quantity} <span>Size: {item.size}</span>{" "}
                    <span>Giá: {item.price.toLocaleString()}đ</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="amount">
            <div className="subtotal">
              <span>Tổng Phụ</span>{" "}
              <span>{cart?.totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="shipping">
              <span>Phí Giao Hàng</span> <span>0đ</span>
            </div>
            <div className="total">
              <span>Tổng</span>{" "}
              <span>{cart?.totalPrice.toLocaleString()}đ</span>
            </div>
          </div>
          <button className="btn btn-primary btn-pay" onClick={handlePayment}>
            <b>Thanh Toán</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
