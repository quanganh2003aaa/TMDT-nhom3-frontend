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
  const [deliverMethod, setdeliverMethod] = useState([]);
  const [selectedDeliverMethod, setSelectedDeliverMethod] = useState("");
  const [voucher, setVoucher] = useState([])
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const idUser = sessionStorage.getItem("idUser")
  const token = sessionStorage.getItem('token');
  const fetchCart = () => {
    axios
    .get(
      `http://localhost:8080/api/cart/getByUser/${idUser}`
    )
    .then((response) => setCart(response.data.result))
    .catch((error) => console.error("Lỗi lấy ra cart:", error.response.data.message));
  }

  const fetchDeliver = () =>{
    axios
      .get("http://localhost:8080/api/delivery/getAll")
      .then((response) => setdeliverMethod(response.data.result))
      .catch((error) => console.error("Lỗi lấy ra delivery:", error.response.data.message));
  }

  const fetchVoucher = () =>{
    axios
      .get("http://localhost:8080/api/voucher/getAll")
      .then((response) => setVoucher(response.data.result))
      .catch((error) => console.error("Lỗi lấy ra voucher:", error.response.data.message));
  }

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Lỗi fetch city:", error));

    fetchCart();
    fetchVoucher();
    fetchDeliver();
  }, []);

  useEffect(() => {
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

  const handleDeliverChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDeliverMethod(selectedId);
  
    const selectedDelivery = deliverMethod.find((deli) => deli.id.toString() === selectedId);
    if (selectedDelivery) {
      setShippingFee(selectedDelivery.price);
    }
  };
  
  
  const handleApplyVoucher = (e) => {
    e.preventDefault();
    const selectedVoucherObj = voucher.find((v) => v.id === selectedVoucher);
    if (selectedVoucherObj) {
      setDiscountValue(selectedVoucherObj.discountValue);
    }
  };
  

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
      deliveryMethod: Number(selectedDeliverMethod),
      paymentMethod: paymentMethod === "cash" ? 1 : 2,
      voucherCode: selectedVoucher || "",
      detailOrderRequestList: cart?.productCartDTOList.map((item) => ({
        id: item.idProduct,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    if (paymentMethod === "cash") {
      console.log("➡️ paymentInfo gửi lên:", paymentInfo);
      axios
        .post("http://localhost:8080/api/order/create", paymentInfo, {
          headers: { Author: `Bearer ${token}`,
                      "Content-Type": "application/json", }})
        .then(() => {
          alert("Thanh toán thành công!");
          window.location.href = "/thankyou";
        })
        .catch((error) => {
          console.error("Error:", error.response.data.message);
          alert("Thanh toán thất bại!");
        });
    } else if (paymentMethod === "vnpay") {
      axios
        .post("http://localhost:8080/api/order/create", paymentInfo, {
          headers: { Author: `Bearer ${token}`,
                      "Content-Type": "application/json", }})
        .then((response) => {
          if (response.data && response.data.result && response.data.result.success) {
            const idOrder = response.data.result.idOrder;
            
            axios
              .post(`http://localhost:8080/vnpay/create/${idOrder}`, {
                headers: { Author: `Bearer ${token}`,
                            "Content-Type": "application/json", }})
              .then((response) => {
                if (response.data && response.data.result) {
                  window.location.href = response.data.result;
                } else {
                  console.error("Lỗi khi chuyển hướng thanh toán VNPay:", response.data);
                }
              })
              .catch((error) => {
                console.error("Lỗi khi tạo thanh toán VNPay:", error.response?.data?.message || error.message);
              });
          } else {
            console.error("Lỗi thanh toán VNPay: Dữ liệu phản hồi không hợp lệ");
            alert("Lỗi khi thanh toán với VNPay");
          }
        })
        .catch((error) => console.error("Error:", error.response.data.message));
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
              <div style={{display:"flex", alignItems:"flex-end", marginTop:"15px"}}>
                <div style={{marginRight:"30px"}}>
                  <label className="label-default">Mã giảm giá:</label>
                  <select style={{padding:"10px 150px 10px 15px"}}
                    className="form-select select-address"
                    id="voucherSelect"
                    value={selectedVoucher}
                    onChange={(e) => setSelectedVoucher(e.target.value)}
                  >
                    <option value="">Chọn mã giảm giá</option>
                    {voucher.map((voucher) => (
                      <option key={voucher.id} value={voucher.id}>
                        {voucher.id}, giảm: {voucher.discountValue.toLocaleString()}đ
                      </option>
                    ))}
                  </select>
                </div>
                <button style={{borderRadius:"5px", padding:"10px 20px", backgroundColor:"#088176", color:"white", fontWeight:"bold"}}
                        onClick={handleApplyVoucher}>
                  Áp dụng
                </button>
              </div>  
              
              <label className="label-default" style={{margin:"20px 0 3px 13px"}}>Hình thức giao hàng:</label>
              <select style={{margin:"3px 12px 10px 12px"}}
                  className="form-select select-address"
                  id="deliveryMethod"
                  value={selectedDeliverMethod}
                  onChange={handleDeliverChange}
                >
                  <option value="">Chọn hình thức giao hàng</option>
                  {deliverMethod.map((deli) => (
                    <option key={deli.id} value={deli.id}>
                      {deli.name}, giá: {deli.price.toLocaleString()}đ
                    </option>
                  ))}
                </select>
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
              <span>Phí Giao Hàng</span> <span>{shippingFee.toLocaleString()}đ</span>
            </div>
            <div className="voucher">
              <span>Giảm Giá</span> <span>{discountValue.toLocaleString()}đ</span>
            </div>
            <div className="total">
              <span>Tổng</span>{" "}
              <span>{(cart?.totalPrice + shippingFee - discountValue).toLocaleString()}đ</span>
            </div>
          </div>
          <button className="btn btn-primary btn-pay" style={{width:"100%", fontSize:"20px"}} onClick={handlePayment}>
            <b>Thanh Toán</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
