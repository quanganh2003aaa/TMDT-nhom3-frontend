import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const [cate, setCate] = useState({
        name: "",
    })

    const handleHuy = () => {
        navigate("/admin/danhmuc");
    }

    const handleChange = (e) => {
        setCate({ ...cate, name: e.target.value });
    };

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("name", cate.name);

        const url = "http://localhost:8080/api/category/create";
        axios 
            .post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                alert("Thêm Danh mục thành công");
                navigate("/admin/danhmuc");
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
                    <h1>Tạo Danh Mục</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/danhmuc">Danh Mục</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-danhmuc">Tạo Danh Mục</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{padding:"10px"}}>Tên Danh Mục:</label>
                        <textarea className="txt-input form-control" id="name" value={cate.name}  onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <button  className="btn-huy" onClick={handleHuy}>Hủy</button>
                            <button className="btn-them" onClick={handleCreate}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;