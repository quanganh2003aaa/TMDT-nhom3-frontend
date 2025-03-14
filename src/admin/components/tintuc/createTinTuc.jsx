import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const [news, setNews] = useState({
        authorId: idUser
    })

    const handleHuy = () => {
        navigate("/admin/tintuc");
    }

    const handleChange = (e) => {
        const { id, value } = e.target;

        setNews((prevNews) => ({
            ...prevNews,
            [id]: value, 
        }));
    };

    const handleCreate = () => {
        const url = "http://localhost:8080/api/blog/create";
        axios 
            .post(url, news)
            .then((response) => {
                alert("Thêm Danh mục thành công");
                navigate("/admin/tintuc");
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
                    <h1>Tạo Tin Tức</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/tintuc">Tin Tức</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-tintuc">Tạo Tin Tức</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="title" className="col-form-label" style={{padding:"20px 10px"}}>Tiêu Đề:</label>
                        <textarea className="txt-input form-control" id="title" value={news.title} onChange={handleChange}></textarea>

                        <label htmlFor="authorId" className="col-form-label" style={{padding:"20px 10px"}}>Tác Giả:</label>
                        <textarea className="txt-input form-control" id="authorId" value={idUser} ></textarea>

                        <label htmlFor="content" className="col-form-label" style={{padding:"20px 10px"}}>Nội Dung:</label>
                        <textarea className="txt-input form-control" id="content" value={news.content} onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/tintuc">
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