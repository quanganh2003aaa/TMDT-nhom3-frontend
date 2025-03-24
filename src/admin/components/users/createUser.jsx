import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './user.css'
import axios from "axios";

const CreateUser = () => {
    const token = sessionStorage.getItem('token');
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
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        tel: "",
        password: "",
        gmail: "",
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setUser({
            ...user,
            [id]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/user/createAdmin", user, {
                headers: { Author: `Bearer ${token}`,
                            "Content-Type": "application/json", }}
        )
            .then((response) => {
                alert("Tạo admin mới thành công");
                navigate("/admin/user");
            })
            .catch((error) => {
                alert(`Tạo người dùng thất bại: ${error.response.data.message}`)
                console.log("Lỗi tạo người dùng:", error.response.data.message);
            })
    };

    const HuyBtn = () => {
        navigate("/admin/user");
    }

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Admin</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/user">Người dùng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-user">Tạo Admin</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row" style={{padding:"50px"}}>
                        <label htmlFor="name" className="col-form-label" style={{padding:"10px"}}>Tên tài khoản:</label>
                        <textarea 
                            type="text" 
                            className="txt-input form-control" 
                            id="name" 
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="tel" className="col-form-label" style={{padding:"10px"}}>Số điện thoại:</label>
                        <textarea 
                            type="text" 
                            className="txt-input form-control" 
                            id="tel" 
                            name="tel"
                            value={user.tel}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="gmail" className="col-form-label" style={{padding:"10px"}}>Email:</label>
                        <textarea 
                            type="email" 
                            className="txt-input form-control" 
                            id="gmail" 
                            name="gmail"
                            value={user.gmail}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="user-password" className="col-form-label" style={{padding:"10px"}}>Mật khẩu:</label>
                        <textarea 
                            type="password" 
                            className="txt-input form-control" 
                            id="password" 
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/user">
                                <button type="button" className="btn-huy" onClick={HuyBtn}>Hủy</button>
                            </a>
                            <button type="submit" className="btn-them" onClick={handleSubmit}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateUser;