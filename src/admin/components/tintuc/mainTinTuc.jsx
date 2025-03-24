import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const token = sessionStorage.getItem("token");


    const handleEditTintuc = (idTintuc) => {
        navigate(`/admin/update-tintuc/${idTintuc}`);  
    };

    const handleDeleteTintuc = (idTintuc) => {
        const url = `http://localhost:8080/api/blog/delete/${idTintuc}`;
        axios 
            .delete(url, {headers: { 
                Author: `Bearer ${token}`,
                "Content-Type": "multipart/form-data" }})
            .then((response) => {
                alert("Xóa tin tức thành công");
                fetchNews();
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi xóa dữ liệu", errorMessage);
            })
    };

    const fetchNews = () => {
        const url = "http://localhost:8080/api/blog/getAll";

        axios 
            .get(url)
            .then((response) => {
                setNews(response.data.result)
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
        fetchNews();
    }, []);

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tin Tức</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/tintuc">Tin Tức</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-tintuc">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Tin Tức</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>Mã</th>
                        <th>Tiêu đề</th>
                        <th>Ngày</th>
                        <th>Tác giả</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {news.map((news) => (
                        <tr key={news.id}>
                            <td style={{textAlign:"center"}}>{news.id}</td>
                            <td><p>{news.title}</p></td>
                            <td><p>{news.createdAt}</p></td>
                            <td><p>{news.authorName}</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditTintuc(news.id)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteTintuc(news.id)}> 
                                    
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