import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {idTintuc} = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState([])

    const fecthNews = () => {
        const url = `http://localhost:8080/api/blog/id/${idTintuc}`;
        axios 
            .get(url)
            .then((response) => {
                setNews(response.data.result)
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi fetch dữ liệu: ", errorMessage);
            })
    }

    useEffect( () => {
        fecthNews();
    }, [idTintuc])

    const handleChange = (e) => {
        const { id, value } = e.target;

        setNews((prevNews) => ({
            ...prevNews,
            [id]: value, 
        }));
    };

    const handleHuy = () => {
        navigate("/admin/tintuc");
    }

    const handleUpdate = () => {
        const Data = {
            title: news.title,
            content: news.content
        }
        const url = `http://localhost:8080/api/blog/update/${idTintuc}`;
        
        axios
            .put(url, Data)
            .then(() => {
                alert("Cập nhật danh mục thành công!");
                navigate("/admin/tintuc"); 
            })
            .catch((error) => {
                alert(`Lỗi khi cập nhật: ${error.response?.data?.message || error.message}`);
            });
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Tin Tức</h1>
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
                            <a className="active" href="/admin/upadte-tintuc">Sửa Tin Tức</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="title" className="col-form-label" style={{padding:"20px 10px"}}>Tiêu Đề:</label>
                        <textarea className="txt-input form-control" id="title" value={news.title} onChange={handleChange}></textarea>

                        <label htmlFor="author" className="col-form-label" style={{padding:"20px 10px"}}>Tác Giả:</label>
                        <textarea className="txt-input form-control" id="author" value={news.authorName} ></textarea>

                        <label htmlFor="content" className="col-form-label" style={{padding:"20px 10px"}}>Nội Dung:</label>
                        <textarea className="txt-input form-control" id="content" value={news.content} onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/tintuc">
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