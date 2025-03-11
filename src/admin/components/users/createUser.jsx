import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './user.css'

const CreateUser = () => {
    const navigate = useNavigate();
    const [Data, setData] = useState({
        tel: "",
        password: "",
        gmail: "",
        name: ""
    });

    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/user/createAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Data)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Tạo tài khoản thành công!");
                window.location.href = "/admin/user";
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
        }
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
                            value={Data.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="tel" className="col-form-label" style={{padding:"10px"}}>Số điện thoại:</label>
                        <textarea 
                            type="text" 
                            className="txt-input form-control" 
                            id="tel" 
                            name="tel"
                            value={Data.tel}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="gmail" className="col-form-label" style={{padding:"10px"}}>Email:</label>
                        <textarea 
                            type="gmail" 
                            className="txt-input form-control" 
                            id="gmail" 
                            name="gmail"
                            value={Data.gmail}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="user-password" className="col-form-label" style={{padding:"10px"}}>Mật khẩu:</label>
                        <textarea 
                            type="password" 
                            className="txt-input form-control" 
                            id="password" 
                            name="password"
                            value={Data.password}
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