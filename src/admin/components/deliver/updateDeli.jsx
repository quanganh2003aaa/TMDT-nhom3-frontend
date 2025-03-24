import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { idDeli } = useParams();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    
    // 🟢 State để lưu dữ liệu
    const [deliver, setDeliver] = useState({
        name: "",
        price: "",
        info: ""
    });

    // 🟢 Lấy dữ liệu từ API
    const fetchDeliver = () => {
        axios
            .get(`http://localhost:8080/api/delivery/id/${idDeli}`, {
                headers: { Author: `Bearer ${token}` }
            })
            .then((response) => {
                setDeliver(response.data.result);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu:", error);
            });
    };

    // 🟢 Chạy 1 lần khi component mount
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

        fetchDeliver();
    }, [idDeli, token]);

    // 🟢 Cập nhật giá trị khi người dùng nhập
    const handleChange = (e) => {
        setDeliver({
            ...deliver,
            [e.target.name]: e.target.value
        });
    };

    // 🟢 Xử lý cập nhật
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/delivery/update/${idDeli}`, deliver, {
                headers: { Author: `Bearer ${token}` }
            });
            alert("Cập nhật thành công!");
            navigate("/admin/deliver");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Hình Thức Giao Hàng</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin/admin">Trang Chủ</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a href="/admin/deliver">Hình Thức Giao Hàng</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a className="active" href="#">Sửa Hình Thức Giao Hàng</a></li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{ padding: "10px" }}>Tên:</label>
                        <textarea
                            className="txt-input form-control"
                            name="name"
                            value={deliver.name}
                            onChange={handleChange}
                        ></textarea>

                        <label htmlFor="price" className="col-form-label" style={{ padding: "10px" }}>Giá:</label>
                        <textarea
                            className="txt-input form-control"
                            name="price"
                            value={deliver.price}
                            onChange={handleChange}
                        ></textarea>

                        <label htmlFor="info" className="col-form-label" style={{ padding: "10px" }}>Thông Tin:</label>
                        <textarea
                            className="txt-input form-control"
                            name="info"
                            value={deliver.info}
                            onChange={handleChange}
                        ></textarea>

                        <div className="btn-form" style={{ paddingTop: "10px" }}>
                            <button className="btn-huy" onClick={() => navigate("/admin/deliver")}>Hủy</button>
                            <button className="btn-them" onClick={handleUpdate}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;
