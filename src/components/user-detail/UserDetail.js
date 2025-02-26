import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDetail.css";

const UserDetails = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Lưu ID đơn hàng đang được xem chi tiết
    const [orderDetails, setOrderDetails] = useState([]);
    const token = sessionStorage.getItem("token");
    const idUser = sessionStorage.getItem("idUser");
  
    useEffect(() => {
      if (!token || !idUser) {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "/login";
        return;
      }
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/order/getOrderByUser/${idUser}`, {
          headers: { Author: `Bearer ${token}` },
        });
        setOrders(response.data.result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        alert("Lỗi khi lấy danh sách đơn hàng!");
      }
    };
  
    const fetchOrderDetails = async (orderId) => {
      try {
        const response = await axios.get(`http://localhost:8080/order/getById/${orderId}`, {
          headers: { Author: `Bearer ${token}` },
        });
        setOrderDetails(response.data.result);
        setSelectedOrder(orderId);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        alert("Lỗi khi lấy chi tiết đơn hàng!");
      }
    };
  
    const cancelOrder = async (orderId) => {
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
      if (isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/order/cancel/${orderId}`, null, {
            headers: { Author: `Bearer ${token}` },
          });
          alert("Hủy đơn hàng thành công!");
          fetchOrders();
        } catch (error) {
          console.error("Lỗi khi hủy đơn hàng:", error);
          alert("Hủy đơn hàng thất bại!");
        }
      }
    };
  
    const completeOrder = async (orderId) => {
      const isConfirmed = window.confirm("Bạn đã nhận đơn hàng này?");
      if (isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/order/success/${orderId}`, null, {
            headers: { Author: `Bearer ${token}` },
          });
          alert("Cảm ơn bạn đã mua hàng thành công!");
          fetchOrders();
        } catch (error) {
          console.error("Lỗi khi xác nhận đơn hàng:", error);
          alert("Lỗi khi xác nhận đơn hàng!");
        }
      }
    };
  
    const handleLogout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("idUser");
      sessionStorage.removeItem("cartItem");
      alert("Bạn đã đăng xuất thành công!");
      window.location.href = "/login";
    };
  
    // Lấy trạng thái của đơn hàng đang xem chi tiết
    const selectedOrderStatus = selectedOrder
      ? orders.find((order) => order.id === selectedOrder)?.status
      : null;
  
    return (
      <div className="d-flex align-items-start menu-user section-p1 row ">
        <div className="nav flex-column nav-pills col-2" style={{backgroundColor:"#f8f9fa"}}>
          <button className="nav-link active" style={{padding:"20px", margin:"15px"}} 
                type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Theo Dõi Đơn Hàng</button>
          <button className="btn-logout" type="button" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
        <div className="tab-content col-8" >
            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"
                tabindex="0">
            <table className="table table-orders">
                <thead>
                <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Ngày/ Tháng/ Năm</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Tình Trạng</th>
                    <th scope="col">Thao tác</th>
                </tr>
                </thead>
                <tbody >
                {orders.map((order) => (
                    <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.totalPrice.toLocaleString()} VND</td>
                    <td>
                        <span
                            className={`status ${
                            order.status === "Đơn hàng đã hủy"
                                ? "status-cancelled"
                                : order.status === "Đang chuẩn bị"
                                ? "status-preparing"
                                : order.status === "Giao hàng thành công"
                                ? "status-completed"
                                : order.status === "Chờ xác nhận"
                                ? "status-pending"
                                : order.status === "Đang giao hàng"
                                ? "status-shipping"
                                : "status-default"
                            }`}
                        >
                            {order.status}
                        </span>
                        </td>

                    <td>
                        <button
                        className="btn btn-outline-primary"
                        onClick={() => fetchOrderDetails(order.id)}
                        >
                        Xem chi tiết
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
          {selectedOrder && (
            <div className="modal-backdrop">
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Chi tiết đơn hàng</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedOrder(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <ul className="list-group">
                      {orderDetails.map((item) => (
                        <li
                          key={item.idProduct}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.idProduct}</div>
                            Size: {item.size} - {item.price.toLocaleString()} VND
                          </div>
                          <span className="badge bg-primary rounded-pill">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal-footer" >
                    {["Chờ xác nhận", "Đang chuẩn bị"].includes(selectedOrderStatus) && (
                      <button
                        className="btn btn-danger"
                        onClick={() => cancelOrder(selectedOrder)}
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                    {selectedOrderStatus === "Đang giao hàng" && (
                      <button
                        className="btn btn-warning"
                        onClick={() => completeOrder(selectedOrder)}
                      >
                        Đã nhận được hàng
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default UserDetails;
  