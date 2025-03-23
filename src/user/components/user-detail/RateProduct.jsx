import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './RateForm.css';

const RateForm = () => {
  const navigate = useNavigate();
  const { idRate } = useParams();
  const idUser = sessionStorage.getItem("idUser");

  const [orderDetails, setOrderDetails] = useState([]);
  const [rates, setRates] = useState({});
  const [contents, setContents] = useState({}); 
  const [loadingStatus, setLoadingStatus] = useState({});

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/order/getById/${idRate}`);
        const products = response.data.result.detailOrderDTOList || [];

        const uniqueProductsMap = new Map();
        products.forEach(product => {
          if (!uniqueProductsMap.has(product.idProduct)) {
            uniqueProductsMap.set(product.idProduct, product);
          }
        });
        const uniqueProducts = Array.from(uniqueProductsMap.values());
        
        setOrderDetails(uniqueProducts);

        const initialRates = {};
        const initialContents = {};
        const initialLoading = {};
        uniqueProducts.forEach(product => {
          initialRates[product.idProduct] = 0;
          initialContents[product.idProduct] = "";
          initialLoading[product.idProduct] = false;
        });

        setRates(initialRates);
        setContents(initialContents);
        setLoadingStatus(initialLoading);

      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error.response?.data?.message || error.message);
      }
    };

    fetchOrderDetails();
  }, [idRate]);

  // Xử lý chọn sao cho sản phẩm
  const handleRateClick = (productId, star) => {
    setRates(prevRates => ({
      ...prevRates,
      [productId]: star
    }));
  };

  // Xử lý nhập nội dung cho sản phẩm
  const handleContentChange = (productId, value) => {
    setContents(prevContents => ({
      ...prevContents,
      [productId]: value
    }));
  };

  // Submit đánh giá cho 1 sản phẩm
  const handleSubmit = async (e, productId) => {
    e.preventDefault();

    const rate = rates[productId];
    const content = contents[productId];

    if (rate === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }

    if (content.trim() === "") {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    const requestData = {
      user: idUser,
      idProduct: productId,
      rate: rate,
      content: content
    };

    try {
      setLoadingStatus(prev => ({ ...prev, [productId]: true }));
      const response = await axios.post("http://localhost:8080/api/rate/create", requestData);

    const resData = response.data;

    if (resData.code === 200 && resData.result === true) {
      alert(`Đánh giá sản phẩm "${productId}" đã được gửi thành công!`);
    } else {
        alert(resData.message || 'Gửi đánh giá thất bại, vui lòng thử lại!');
    }

  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);

    if (error.response && error.response.data && error.response.data.message) {
      alert(`Lỗi: ${error.response.data.message}`);
    } else {
      alert("Đã xảy ra lỗi khi gửi đánh giá, vui lòng thử lại!");
    }

  } finally {
    setLoadingStatus(prev => ({ ...prev, [productId]: false }));
  }
  };

  return (
    <div className="rate-container">
      <h2>Đánh Giá Sản Phẩm Trong Đơn Hàng #{idRate}</h2>

      {orderDetails.length === 0 ? (
        <p>Không có sản phẩm để đánh giá hoặc đang tải...</p>
      ) : (
        orderDetails.map((product, index) => (
          <div key={index} className="product-rate-card">
            <h3>{product.nameProduct}</h3>
            <p><strong>Mã sản phẩm:</strong> {product.idProduct}</p>
            <img
              src={`/images/product/${product.img}`}
              alt={product.nameProduct}
              className="product-image"
            />

            <form onSubmit={(e) => handleSubmit(e, product.idProduct)} className="rate-form">
              <div className="rate-stars">
                <label>Chọn số sao đánh giá:</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${rates[product.idProduct] >= star ? "active" : ""}`}
                      onClick={() => handleRateClick(product.idProduct, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={`content-${product.idProduct}`}>Nội dung đánh giá:</label>
                <textarea
                  id={`content-${product.idProduct}`}
                  value={contents[product.idProduct]}
                  onChange={(e) => handleContentChange(product.idProduct, e.target.value)}
                  placeholder="Nhập nội dung đánh giá của bạn..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingStatus[product.idProduct]}
                className="submit-btn"
              >
                {loadingStatus[product.idProduct] ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
};

export default RateForm;
