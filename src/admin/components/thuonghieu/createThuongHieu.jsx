import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const [brand, setBrand] = useState({
        name: "",
    })
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
        },[])

    const handleHuy = () => {
        navigate("/admin/thuonghieu");
    }

    const handleChange = (e) => {
        setBrand({ ...brand, name: e.target.value });
    };

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("name", brand.name);

        const url = "http://localhost:8080/api/brand/create";
        axios 
            .post(url, formData, {
                headers: {Author: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                alert("Thêm Danh mục thành công");
                navigate("/admin/thuonghieu");
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi gửi dữ liệu: ", errorMessage);
            })
    }

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Thương Hiệu</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/thuonghieu">Thương Hiệu</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-thuonghieu">Tạo Thương Hiệu</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{padding:"10px"}}>Tên thương hiệu:</label>
                        <textarea className="txt-input form-control" id="name" value={brand.name}  onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/thuonghieu">
                                <button  className="btn-huy" onClick={handleHuy}>Hủy</button>
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