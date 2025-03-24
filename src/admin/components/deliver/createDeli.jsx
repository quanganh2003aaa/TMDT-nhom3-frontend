import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    // 🟢 State để lưu giá trị nhập từ form
    const [delivery, setDelivery] = useState({
        name: "",
        price: "",
        info: "",
    });

    // 🟢 Kiểm tra quyền ADMIN
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

    // 🟢 Xử lý thay đổi input
    const handleChange = (e) => {
        setDelivery({ ...delivery, [e.target.name]: e.target.value });
    };

    // 🟢 Gửi request tạo hình thức giao hàng
    const handleCreate = () => {
        const url = "http://localhost:8080/api/delivery/create";

        axios.post(url, delivery, {
            headers: { 
                Author: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            alert("Tạo hình thức giao hàng thành công!");
            navigate("/admin/deliver"); // Chuyển hướng về trang danh sách
        })
        .catch((error) => {
            console.error("Lỗi khi tạo:", error.response?.data?.message || error.message);
        });
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Hình Thức Giao Hàng</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin/admin">Trang Chủ</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a href="/admin/deliver">Hình Thức Giao Hàng</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a className="active" href="/admin/create-deliver">Tạo Hình Thức Giao Hàng</a></li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{ padding: "10px" }}>Tên:</label>
                        <textarea
                            className="txt-input form-control"
                            id="name"
                            name="name"
                            value={delivery.name}
                            onChange={handleChange}
                        ></textarea>

                        <label htmlFor="price" className="col-form-label" style={{ padding: "10px" }}>Giá:</label>
                        <textarea
                            className="txt-input form-control"
                            id="price"
                            name="price"
                            value={delivery.price}
                            onChange={handleChange}
                        ></textarea>

                        <label htmlFor="info" className="col-form-label" style={{ padding: "10px" }}>Thông Tin:</label>
                        <textarea
                            className="txt-input form-control"
                            id="info"
                            name="info"
                            value={delivery.info}
                            onChange={handleChange}
                        ></textarea>

                        <div className="btn-form" style={{ paddingTop: "10px" }}>
                            <a href="/admin/deliver">
                                <button className="btn-huy">Hủy</button>
                            </a>
                            <button className="btn-them" onClick={handleCreate}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;
