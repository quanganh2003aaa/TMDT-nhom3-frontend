import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8080/api/auth/introspect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.result.valid || data.result.scope !== "ADMIN") {
                window.location.href = "/admin/404";
            }
        })
        .catch(() => window.location.href = "/admin/404");
    }, [token]);

    useEffect(() => {
        fetchOrders();
        fetchOrderProducts();
    }, [currentPage, query, selectedStatus]);

    const fetchOrders = () => {
        let url = `http://localhost:8080/api/refund/getAll?page=${currentPage}`;
    
        if (query) {
            url = `http://localhost:8080/api/order/getOrderSearch?query=${encodeURIComponent(query)}&page=${currentPage}`;
        } else if (selectedStatus) {
            url = `http://localhost:8080/api/order/getById/${selectedStatus}?page=${currentPage}`;
        }

        fetch(url, {
            method: "GET",
            headers: { "Author": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data.result.objectList);
            setTotalPages(data.result.totalPages);
        });
    };

    const fetchOrderProducts = (orderId) => {
        axios
            .get(`http://localhost:8080/api/order/getById/${orderId}`)
            .then((response) => {
                setOrderProducts([response.data.result]);
            })
            .catch((error)=> {
                console.log(error.response?.data?.message || "Lỗi không xác định");
            })
    };

    const updateOrderStatus = (orderId, action) => {
        fetch(`http://localhost:8080/api/refund/${action}/${orderId}`, {
            method: "PUT",
            headers: { "Author": `Bearer ${token}` }
        })
        .then(() => {
            alert("Cập nhật sản phẩm thành công!");
            fetchOrders();
        });
    };

    const handleExpandOrder = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            setOrderProducts([]);
        } else {
            setExpandedOrder(orderId);
            fetchOrderProducts(orderId);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Đơn Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/orders">Đơn Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>Danh Sách Đơn Hàng</h3>
                    </div>
                    <div className="filter d-flex justify-content-between">
                        <select value={selectedStatus}
                                className="form-select orderStatusSelect" aria-label="Default select example"
                                style={{width: "30%"}} 
                                onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="0">Tất cả đơn hàng</option>
                            <option value="1">Chờ xác nhận</option>
                            <option value="2">Đang chuẩn bị</option>
                            <option value="3">Đang giao hàng</option>
                            <option value="4">Giao hàng thành công</option>
                            <option value="5">Đơn hàng đã hủy</option>
                        </select>
                        <form action="#" id="idSearch" className="search-order-form">
                            <div className="form-input">
                                <input type="search" placeholder="Tìm kiếm..." value={query} onChange={(e) => setQuery(e.target.value)} />
                                <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                            </div>
                        </form>
                    </div>
                    <div className="accordion">
                        {orders.map((order) => (
                            <div key={order.id} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-detail-order" type="button"
                                            onClick={() => handleExpandOrder(order.id)}
                                    >
                                        <span>#{order.id} - {new Date(order.createdAt).toLocaleDateString()}</span>
                                        <div style={{marginLeft: "50px", padding:"5px", borderRadius:"10px",
                                            color: "white",
                                            backgroundColor: 
                                            order.status === "Chờ xác nhận" ? "gray" :
                                            order.status === "Đơn hoàn bị từ chối" ? "red" :
                                            "black"
                                        }}>
                                            {order.status}
                                        </div>
                                    </button>
                                </h2>
                            
                                {expandedOrder === order.id && orderProducts.map((product) => (
                                    <div id="collapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body row">
                                            <div className="card col-5">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label htmlFor="nameUser" className="form-label">Họ tên</label>
                                                        <input type="text" className="form-control" id="nameUser"
                                                            value={product.nameUser} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="tel" className="form-label">Số điện thoại</label>
                                                        <input type="tel" className="form-control" id="tel"
                                                            value={product.tel} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                        <input type="text" className="form-control" id="address"
                                                            value={product.address} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Phương thức giao hàng</label>
                                                        <input type="text" className="form-control" id="address"
                                                            value={product.deliveryMethod} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="note" className="form-label">Ghi chú</label>
                                                        <textarea className="form-control" id="note"
                                                            rows="3" value={product.note} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card col-7">
                                                <div className="card-body">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Mã sản phẩm</th>
                                                                <th scope="col">Size</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Giá</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {product.detailOrderDTOList.map((item) => (
                                                                <tr key={item.idProduct}>
                                                                    <td>{item.idProduct}</td>
                                                                    <td>{item.size}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{formatCurrency(item.price)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="total" style={{padding: "10px"}}>
                                                        <span>Thành tiền: {formatCurrency(product.totalPrice)}</span>
                                                        
                                                    </div>
                                                    <div className="total" style={{padding:"0 10px 200px 0", color: product.paymentStatus==="PAID"? "#088176" : "red"}}>
                                                        <span>{product.paymentStatus=="PAID"?"Đã thanh toán":"Chưa thanh toán"}</span>
                                                    </div>
                                                    {order.status === "Chờ xác nhận hoàn trả" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Xác nhận hoàn trả</button>
                                                    )}
                                                    {order.status === "Hoàn đơn được chấp nhận" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Đang hoàn trả</button>
                                                    )}
                                                    {order.status === "Đang trả hàng" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Hoàn đơn thành công</button>
                                                    ) && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Đơn hoàn bị từ chối</button>
                                                    )}
                                                    {order.status === "Hoàn đơn thành công" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Hoàn đơn thành công</button>
                                                    )}
                                                    {order.status === "Đơn hoàn bị từ chối" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Đơn hoàn bị từ chối</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="pagination" style={{display: "flex",
                        justifyContent: "end",
                        padding: "0 20px"}}>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                            key={i}
                            onClick={() => {
                                setCurrentPage(i +1);
                            }}
                        >
                            {i + 1}
                        </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
