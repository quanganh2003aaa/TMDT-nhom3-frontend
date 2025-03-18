import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import SideBar from "./side-bar";
import './UserDetail.css'
import './UserDetailCu.css'

const Body = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const token = sessionStorage.getItem("token");
    const idUser = sessionStorage.getItem("idUser");

     useEffect(() => {
          if (!token || !idUser) {
            alert("Bạn cần đăng nhập để truy cập trang này!");
            window.location.href = "/login";
            return;
          }
          fetchOrders();
        }, [token, idUser]);
      
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/order/getByUser/${idUser}`
            );
            setOrders(response.data.result);
          } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            alert("Lỗi khi lấy danh sách đơn hàng!");
          }
        };
      
        const fetchOrderDetails = async (orderId) => {
          navigate(`/user-detail/order-detail/${orderId}`);
        };
      
        const cancelOrder = async (orderId) => {
          // const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
          // if (isConfirmed) {
          //   try {
          //     await axios.put(`http://localhost:8080/order/cancel/${orderId}`, null, {
          //       headers: { Author: `Bearer ${token}` },
          //     });
          //     alert("Hủy đơn hàng thành công!");
          //     fetchOrders();
          //   } catch (error) {
          //     console.error("Lỗi khi hủy đơn hàng:", error);
          //     alert("Hủy đơn hàng thất bại!");
          //   }
          // }
        };
      
        const completeOrder = async (orderId) => {
          // const isConfirmed = window.confirm("Bạn đã nhận đơn hàng này?");
          // if (isConfirmed) {
          //   try {
          //     await axios.put(`http://localhost:8080/order/success/${orderId}`, null, {
          //       headers: { Author: `Bearer ${token}` },
          //     });
          //     alert("Cảm ơn bạn đã mua hàng thành công!");
          //     fetchOrders();
          //   } catch (error) {
          //     console.error("Lỗi khi xác nhận đơn hàng:", error);
          //     alert("Lỗi khi xác nhận đơn hàng!");
          //   }
          // }
        };
      
        const selectedOrderStatus = selectedOrder
          ? orders.find((order) => order.id === selectedOrder)?.status
          : null;
      
  return(
    <div className="udetail">
      <SideBar/>

      <div className="tab-content col-8" >
            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"
                tabindex="0">
            <table className="table table-orders">
                <thead>
                <tr>
                    <th scope="col" style={{textAlign:"center"}}>Mã đơn hàng</th>
                    <th scope="col" style={{textAlign:"center"}}>Ngày/ Tháng/ Năm</th>
                    <th scope="col" style={{textAlign:"center"}}>Tổng Tiền</th>
                    <th scope="col" style={{textAlign:"center"}}>Tình Trạng</th>
                    <th scope="col" style={{textAlign:"center"}}>Thao tác</th>
                </tr>
                </thead>
                <tbody >
                {orders.length > 0 ? 
                  (orders.map((order) => (
                      <tr key={order.id}>
                          <td style={{textAlign:"center"}}>{order.id}</td>
                          <td style={{textAlign:"center"}}>{order.date}</td>
                          <td style={{textAlign:"center"}}>{order.finalAmount}</td>
                          <td style={{textAlign:"center"}}>
                              <span
                                  className= {`status ${
                                      order.status === "Đơn hàng đã hủy"
                                      ? "status-cancelled"
                                      :order.status === "Đơn hoàn bị từ chối"
                                      ? "status-cancelled"
                                      : order.status === "Đang chuẩn bị"
                                      ? "status-preparing"
                                      : order.status === "Giao hàng thành công"
                                      ? "status-preparing"
                                      : order.status === "Hoàn đơn thành công"
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
                              className="btn btn-outline-primary" style={{margin:"0 0 0 40px"}}
                              onClick={() => fetchOrderDetails(order.id)}
                              >
                              Xem chi tiết
                              </button>
                          </td>
                      </tr>
                  ))) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
                            Bạn chưa có bình luận nào
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
          
        </div>
      
    </div>
  );
};

export default Body;