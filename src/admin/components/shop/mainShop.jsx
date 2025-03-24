import axios from 'axios';
import { error } from 'jquery';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState([]);
    const token = sessionStorage.getItem('token');
    const fecthStore = () =>{
        axios 
            .get("http://localhost:8080/api/store/getAll")
            .then((res) => {
                setStore(res.data.result);
            })
            .catch((error) => {
                console.log("Lỗi fecth store: ",error.response.data.message)
            })
    }

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
        fecthStore();
    },[])

    const handleEditStore = (idStore) => {
        navigate(`/admin/update-shop/${idStore}`); 
    };

    const handleDeleteStore = (idStore) => {
        if (window.confirm(`Bạn chắc chắn muốn xóa cửa hàng ${idStore} không?`)) {
            try{
                axios .delete(`http://localhost:8080/api/store/delete/${idStore}`,{
                    headers: {
                        "Author": `Bearer ${token}`
                    }
                })
                fecthStore();
            }catch{
                alert("Xóa sản phẩm thất bại");
                console.log("Lỗi xóa sản phẩm", error);
            }
        }
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Cửa Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/shop">Cửa Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-shop">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Cửa Hàng</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Quản lý Cửa Hàng</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map((store, index) => (
                        <tr key={index+1}>
                        <td style={{padding:"0px 70px"}}>{index+1}</td>
                        <td><p>{store.address}</p></td>
                        <td><p>{store.tel}</p></td>
                        <td><p>{store.user}</p></td>
                        <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                            <div>
                                <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditStore(store.id)}> 
                                    
                                <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                            <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteStore(store.id)}> 
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