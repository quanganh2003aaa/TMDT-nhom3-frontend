import React, { useEffect, useState } from "react";
import './order.css'

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
        fetch("http://localhost:8080/auth/introspect", {
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
    }, [currentPage, query, selectedStatus]);

    const fetchOrders = () => {
        let url = `http://localhost:8080/order/getOrderSearch?page=${currentPage}`;
        if (query) url += `&query=${encodeURIComponent(query)}`;
        if (selectedStatus) url += `&select=${selectedStatus}`;

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
        fetch(`http://localhost:8080/order/getById/${orderId}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setOrderProducts(data.result || []));
    };

    const updateOrderStatus = (orderId, action) => {
        fetch(`http://localhost:8080/order/${action}/${orderId}`, {
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
                        {orders.map((order, index) => (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-detail-order" type="button"
                                            onClick={() => handleExpandOrder(order.id)}
                                    >
                                        <span>#{order.id} - {new Date(order.date).toLocaleDateString()}</span>
                                        <div style={{marginLeft: "50px", padding:"5px", borderRadius:"10px",
                                            color:  order.status === "Đang giao hàng" ? "black" :
                                            "white",
                                            backgroundColor: order.status === "Đang giao hàng" ? "yellow" :
                                            order.status === "Đang chuẩn bị" ? "green" :
                                            order.status === "Chờ xác nhận" ? "gray" :
                                            order.status === "Đơn hàng đã hủy" ? "red" :
                                            "transparent"
                                        }}>
                                            {order.status}
                                        </div>
                                    </button>
                                </h2>
                                {expandedOrder === order.id && (
                                    <div id="collapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body row">
                                            <div className="card col-5">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label htmlFor="nameUser" className="form-label">Họ tên</label>
                                                        <input type="text" className="form-control" id="nameUser"
                                                            value={order.nameUser} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="tel" className="form-label">Số điện thoại</label>
                                                        <input type="tel" className="form-control" id="tel"
                                                            value={order.tel} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                        <input type="text" className="form-control" id="address"
                                                            value={order.address} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="note" className="form-label">Ghi chú</label>
                                                        <textarea className="form-control" id="note"
                                                            rows="3" value={order.note} readOnly />
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
                                                            {orderProducts.map(product => (
                                                                <tr key={product.idProduct}>
                                                                    <td style={{fontWeight:"bold"}}>{product.idProduct}</td>
                                                                    <td>{product.size}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>{formatCurrency(product.price)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="total" style={{padding: "10px", paddingBottom:"20px"}}>
                                                        <span>Thành tiền: {formatCurrency(order.totalPrice)}</span>
                                                    </div>
                                                    {order.status === "Chờ xác nhận" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "confirm")}>Xác nhận đơn hàng</button>
                                                    )}
                                                    {order.status === "Đang chuẩn bị" && (
                                                        <button className="btnAdmin" onClick={() => updateOrderStatus(order.id, "deliver")}>Vận chuyển đơn hàng</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                setCurrentPage(i + 1);
                                window.location.reload();
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
