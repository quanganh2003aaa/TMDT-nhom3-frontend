import axios from 'axios';
import { error } from 'jquery';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const idUser = sessionStorage.getItem("idUser");
    const navigate = useNavigate();
    const [store, setStore] = useState([]);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setStore({
            ...store,
            [id]: value
        })
    }

    const handleCreate = () => {
        const formData = new FormData();

        formData.append("user", idUser);
        formData.append("address", store.address);
        formData.append("tel", store.tel);

        axios 
            .post("http://localhost:8080/api/store/create", formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((response) => {
                alert("Tạo cửa hàng thành công")
                navigate("/admin/shop");
            })
            .catch((error) => {
                alert(`Lỗi tạo store: ${error.response.data.message}`);
                console.log("Lỗi tạo store: ", error.response.data.message);
            })
    }

    const handleHuy = () => {
        navigate("/admin/shop");
    }

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Cửa Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/shop">Cửa Hàng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-shop">Tạo Cửa Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="user" className="col-form-label" style={{padding:"10px"}}>Quản Lý Cửa Hàng:</label>
                        <textarea className="txt-input form-control" id="user" value={idUser} readOnly></textarea>

                        <label htmlFor="address" className="col-form-label" style={{padding:"10px"}}>Địa Chỉ:</label>
                        <textarea className="txt-input form-control" id="address" onChange={handleChange}></textarea>

                        <label htmlFor="tel" className="col-form-label" style={{padding:"10px"}}>Số Điện Thoại:</label>
                        <textarea type="number" className="txt-input form-control" id="tel" onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/shop">
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