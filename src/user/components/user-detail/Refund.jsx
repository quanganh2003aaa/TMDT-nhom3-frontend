import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './RefundRequest.css'; 

const RefundRequest = () => {
  const navigate = useNavigate();
  const { idOrder } = useParams(); 
  const idUser = sessionStorage.getItem("idUser");

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRefundSubmit = async (e) => {
    e.preventDefault();

    if (!reason) {
      alert("Vui lòng chọn lý do hoàn trả!");
      return;
    }

    if (!idUser || !idOrder) {
      alert("Thiếu thông tin người dùng hoặc đơn hàng!");
      return;
    }

    const requestData = {
      idUser: idUser,
      idOrder: idOrder,
      reason: reason
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/refund/create", requestData);

      if (response.data) {
        alert("Yêu cầu hoàn trả đã được gửi thành công!");
        navigate("/user-detail/history"); 
      } else {
        alert("Gửi yêu cầu thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu hoàn trả:", error.response?.data?.message || error.message);
      alert("Đã xảy ra lỗi khi gửi yêu cầu hoàn trả!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="refund-container">
      <h2>Yêu Cầu Hoàn Trả Đơn Hàng</h2>

      <form onSubmit={handleRefundSubmit} className="refund-form">
        <div className="refund-info">
          <p><strong>Mã đơn hàng:</strong> {idOrder}</p>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Chọn lý do hoàn trả:</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(parseInt(e.target.value))}
            required
          >
            <option value="">-- Chọn lý do --</option>
            <option value={1}>Đặt nhầm sản phẩm hoặc kích thước</option>
            <option value={2}>Sản phẩm giao muộn, không kịp sử dụng</option>
            <option value={3}>Sản phẩm bị lỗi do vận chuyển</option>
            <option value={4}>Đã nhận được sản phẩm từ đơn hàng khác</option>
            <option value={5}>Không đúng số lượng sản phẩm trong đơn hàng</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Đang gửi..." : "Gửi yêu cầu hoàn trả"}
        </button>
      </form>
    </div>
  );
};

export default RefundRequest;
