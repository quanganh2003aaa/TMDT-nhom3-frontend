import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [brand, setBrand] = useState([]);
    const token = sessionStorage.getItem("token");

    const handleEditThuongHieu = (idThuongHieu) => {
        navigate(`/admin/update-thuonghieu/${idThuongHieu}`);  
    };

    const handleDeleteThuongHieu = (idThuongHieu) => {
        const url = `http://localhost:8080/api/brand/delete/${idThuongHieu}`;

        axios 
            .delete(url, {
                headers: {Author: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                alert("Xóa thương hiệu thành công");
                fetchBrand();
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi xóa dữ liệu", errorMessage);
            })
    };

    const fetchBrand = () => {
        const url = "http://localhost:8080/api/brand/getAll";

        axios 
            .get(url)
            .then((response) => {
                setBrand(response.data.result)
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi fetch dữ liệu", errorMessage);
            })
    }

    useEffect( () => {
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
        fetchBrand();
    }, []);

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Thương Hiệu</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/thuonghieu">Thương Hiệu</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-thuonghieu">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Thương Hiệu</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Tên Thương Hiệu</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {brand.map((brand) => (
                        <tr key={brand.id}>
                            <td style={{padding:"0px 70px"}}>{brand.id}</td>
                            <td><p style={{fontSize:"20px"}}>{brand.name} </p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditThuongHieu(brand.id)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteThuongHieu(brand.id)}> 
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>   
            </div>
        </main>
    );
};

export default Main;