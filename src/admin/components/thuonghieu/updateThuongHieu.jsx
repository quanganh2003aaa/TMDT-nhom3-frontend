import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {idThuongHieu} = useParams();
    const navigate = useNavigate();
    const [brand, setBrand] = useState({name: ""})

    const fecthBrand = () => {
        const url = `http://localhost:8080/api/brand/${idThuongHieu}`;
        axios 
            .get(url)
            .then((response) => {
                setBrand({name: response.data.result.name})
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi fetch dữ liệu: ", errorMessage);
            })
    }

    useEffect( () => {
        fecthBrand();
    }, [idThuongHieu])

    const handleChange = (e) => {
        setBrand({ ...brand, name: e.target.value });
    };

    const handleHuy = () => {
        navigate("/admin/thuonghieu");
    }

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", brand.name);

        const url = `http://localhost:8080/api/brand/update/${idThuongHieu}`;
        axios
            .put(url, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(() => {
                alert("Cập nhật danh mục thành công!");
                navigate("/admin/thuonghieu"); 
            })
            .catch((error) => {
                alert(`Lỗi khi cập nhật: ${error.response?.data?.message || error.message}`);
            });
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Thương Hiệu</h1>
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
                            <a className="active" href="/admin/upadte-thuonghieu">Sửa Thương Hiệu</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{padding:"10px"}}>Tên thương hiệu:</label>
                        <textarea className="txt-input form-control" id="name" onChange={handleChange} value={brand.name}></textarea>

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/thuonghieu">
                                <button  className="btn-huy" onClick={handleHuy}>Hủy</button>
                            </a>
                            <button className="btn-them" onClick={handleUpdate}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;