import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {idTintuc} = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState([])
    const [comment, setComment] = useState([]);
    const token = sessionStorage.getItem("token");

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

    const fetchComment = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/comment/blog/${idTintuc}`,{
            headers: {
                "Author": `Bearer ${token}`
            }
        }
          );
          setComment(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách bình luận:", error.response.data.message);
          alert("Lỗi khi lấy danh sách bình luận!");
        }
      };

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
        fecthNews();
        fetchComment();
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
            .put(url, Data,{
                headers: {
                    "Content-Type": "application/json",
                    "Author": `Bearer ${token}`
                }
            })
            .then(() => {
                alert("Cập nhật danh mục thành công!");
                navigate("/admin/tintuc"); 
            })
            .catch((error) => {
                alert(`Lỗi khi cập nhật: ${error.response?.data?.message || error.message}`);
            });
    };

    const handleDelete = (idBlog) => {
        axios
          .delete(`http://localhost:8080/api/comment/delete/${idBlog}`, {headers: { 
            Author: `Bearer ${token}` }})
          .then(() => {
            alert("Xóa bình luận thành công");
            fetchComment();
          })
          .catch((error) => {
            console.log("Lỗi xóa sản phẩm: ", error.response.data.message);
          })
      }

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

            <div className="board" style={{display:"flex"}}>
                <div className="board1">
                    <div className="row">
                        <label htmlFor="title" className="col-form-label" style={{padding:"20px 10px"}}>Tiêu Đề:</label>
                        <textarea className="txt-input form-control" id="title" value={news.title} onChange={handleChange}></textarea>

                        <label htmlFor="author" className="col-form-label" style={{padding:"20px 10px"}}>Tác Giả:</label>
                        <textarea className="txt-input form-control" readOnly id="author" value={news.authorName} ></textarea>

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
                <div className="board2" style={{width:"1150px", maxHeight:"500px", overflowY:"auto", marginBottom:"20px"}}>
                <h3 style={{margin:"20px"}}>Các bình luận của bài viết</h3>
                <table className="table table-orders">
                    <thead>
                    <tr>
                        <th scope="col" style={{textAlign:"center"}}>Người viết</th>
                        <th scope="col" style={{textAlign:"center"}}>Nội dung</th>
                        <th scope="col" style={{textAlign:"center"}}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody >
                    {comment.length > 0 ? 
                    (comment.map((comment) => (
                        <tr key={comment.id}>
                            <td style={{textAlign:"center"}}>{comment.userName}</td>
                            <td style={{textAlign:"center"}}>{comment.content}</td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px", justifyContent:"space-around"}} >
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDelete(comment.id)}>                                     
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
                                Bài viết chưa có bình luận nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </main>
    );
};

export default Update;