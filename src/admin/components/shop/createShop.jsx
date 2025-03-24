import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const idUser = sessionStorage.getItem("idUser");
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [store, setStore] = useState({user: "", address: "", tel: "" });

    useEffect(() => {
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            navigate("/login");
            return;
        }
        
        fetch("http://localhost:8080/api/auth/introspect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.result.valid || data.result.scope !== "ADMIN") {
                navigate("/admin/404");
            }
        })
        .catch(() => navigate("/admin/404"));
    }, [navigate, token]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setStore((prevStore) => ({
            ...prevStore,
            [id]: value
        }));
    };

    const handleCreate = () => {
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            navigate("/login");
            return;
        }

        console.log("Dữ liệu store:", store);
        
        const formData = new FormData();
        formData.append("user", idUser);
        formData.append("address", store.address);
        formData.append("tel", store.tel);

        axios.post("http://localhost:8080/api/store/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Author": `Bearer ${token}`
            }
        })
        .then(() => {
            alert("Tạo cửa hàng thành công");
            navigate("/admin/shop");
        })
        .catch((error) => {
            console.error("Lỗi tạo store:", error.response);
            alert(`Lỗi tạo store: ${error.response?.data?.message || "Lỗi không xác định"}`);
        });
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Cửa Hàng</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin/admin">Trang Chủ</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a href="/admin/shop">Cửa Hàng</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a className="active" href="/admin/create-shop">Tạo Cửa Hàng</a></li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="address" className="col-form-label" style={{ padding: "10px" }}>Địa Chỉ:</label>
                        <textarea className="txt-input form-control" id="address" onChange={handleChange} value={store.address}></textarea>

                        <label htmlFor="tel" className="col-form-label" style={{ padding: "10px" }}>Số Điện Thoại:</label>
                        <input type="text" className="txt-input form-control" id="tel" onChange={handleChange} value={store.tel} />

                        <div className="btn-form" style={{ paddingTop: "10px" }}>
                            <button className="btn-huy" onClick={() => navigate("/admin/shop")}>Hủy</button>
                            <button className="btn-them" onClick={handleCreate}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;
