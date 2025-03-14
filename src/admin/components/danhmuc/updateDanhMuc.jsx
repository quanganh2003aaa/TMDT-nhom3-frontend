import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
    const { idCate } = useParams(); 
    const navigate = useNavigate();
    const [cate, setCate] = useState([])

    const fecthCate = () => {
        const url = "";
        axios 
            .get(url)
            .then((response) => {
                setCate(response.data.result)
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi fetch dữ liệu: ", errorMessage);
            })
    }

    useEffect( () => {
        fecthCate();
    }, [idCate])

    const handleChange = (e) => {
        setCate({ ...cate, name: e.target.value });
    };

    const handleHuy = () => {
        navigate("/admin/danhmuc");
    }

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", cate.name);

        const url = `http://localhost:8080/api/category/update/${idCate}`;
        axios
            .put(url, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(() => {
                alert("Cập nhật danh mục thành công!");
                navigate("/admin/danhmuc"); 
            })
            .catch((error) => {
                alert(`Lỗi khi cập nhật: ${error.response?.data?.message || error.message}`);
            });
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Danh Mục</h1>
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
                            <a className="active" href="/admin/upadte-danhmuc">Sửa Danh Mục</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="user-head" className="col-form-label" style={{padding:"10px"}}>Danh Mục:</label>
                        <textarea
                            className="txt-input form-control"
                            id="category-name"
                            value={cate.name}
                            onChange={handleChange}
                        ></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <button  className="btn-huy" onClick={handleHuy}>Hủy</button>
                            <button className="btn-them" onClick={handleUpdate}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;