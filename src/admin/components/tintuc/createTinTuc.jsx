import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const [news, setNews] = useState({
        authorId: idUser,
        title: "",       
        content: "",
    })
    const token = sessionStorage.getItem("token");

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
        }, [])

    const handleHuy = () => {
        navigate("/admin/tintuc");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNews((prevNews) => ({
            ...prevNews,
            [name]: value,
        }));
    };
    

    const handleCreate = (e) => {
        e.preventDefault(); // Ngăn reload trang

        axios.post("http://localhost:8080/api/blog/create", news, {
            headers: {
                "Content-Type": "application/json",
                Author: `Bearer ${token}`, // Nếu cần token
            },
        })
        .then((response) => {
            alert("Thêm bài viết thành công!");
            navigate("/admin/tintuc");
        })
        .catch((error) => {
            console.log("Lỗi khi gửi dữ liệu:", error.response?.data?.message || error.message);
        });
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
                    <label htmlFor="title" className="col-form-label" style={{ padding: "20px 10px" }}>
                        Tiêu Đề:
                    </label>
                    <textarea
                        className="txt-input form-control"
                        id="title"
                        name="title"
                        value={news.title}
                        onChange={handleChange}
                    />

                    <label htmlFor="content" className="col-form-label" style={{ padding: "20px 10px" }}>
                        Nội Dung:
                    </label>
                    <textarea
                        className="txt-input form-control"
                        id="content"
                        name="content" 
                        value={news.content}
                        onChange={handleChange}
                    />

                    <div className="btn-form" style={{ paddingTop: "10px" }}>
                        <button className="btn-huy" onClick={() => navigate("/admin/tintuc")}>Hủy</button>
                        <button className="btn-them" onClick={handleCreate}>Thêm</button>
                    </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;