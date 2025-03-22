import React, { useEffect, useState } from "react";
import './blog.css'
import axios from "axios";
import { useParams } from "react-router-dom";

const Body = () => {
    const { idBlog } = useParams();
    const idUser = sessionStorage.getItem("idUser");
    const [blog, setBlog] = useState([]);
    const [date, setDate] = useState(null);
    const [comment, setComment] = useState([]);
    const [cmtByuser, setCmtByUser] = useState({
        userId: idUser,
        blogId: idBlog,
        content: "",
    });

    const fetchBlog = () => {
        axios
            .get(`http://localhost:8080/api/blog/id/${idBlog}`)
            .then((response)=> {
                setBlog(response.data.result);
                const blogDate = new Date(response.data.result.createdAt);
                setDate(blogDate);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }

    const fetchComment = () => {
        axios
            .get(`http://localhost:8080/api/comment/blog/${idBlog}`)
            .then((response) => {
                setComment(response.data);
            })
            .catch((error) => {
                console.log("Lỗi fetch comment: ", error.response.data.message);
            })
    }
    
    useEffect(()=> {
        fetchBlog();
        fetchComment();
    }, [idBlog])


  const handleSubmit = () => {
    if (!idUser) {
      alert("Bạn phải đăng nhập trước!");
      window.location.href = "/login"; 
      return;
    }

    if (cmtByuser.content.trim() === "") {
      alert("Vui lòng chọn số sao và nhập nội dung đánh giá!");
      return;
    }

    axios
        .post("http://localhost:8080/api/comment/create", cmtByuser)
        .then(() => {
            alert("Bình luận thành công");
            fetchComment();
            setCmtByUser({content: ""})
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
  };

  const handleChange = (e) => {
    const {id, value} = e.target;

    setCmtByUser({
        ...cmtByuser,
        [id]: value
    })
  }

  return (
    <div style={{margin:"50px 100px"}}>
        <div className="blog-detail">
            <h1>{blog.title}</h1>
            {date && <h4>Ngày đăng: {`${date.getDate()}/${date.getMonth() + 1}`}</h4>}
            <h5 style={{marginBottom:"30px"}}>Tác giả: {blog.authorName}</h5>
            <h5>{blog.content}</h5>
        </div>

        <div className="blog-comment">
        <section id="form-details" className="row ">
            <h2>
                Bình luận của bạn giúp chúng tôi tốt hơn từng ngày!
            </h2>
            <div className="rating-container col-6">
                <div className="rating-title">Bình luận sản phẩm</div>
                <textarea
                name="review"
                id="content"
                cols="30"
                rows="10"
                placeholder="Mời bạn để lại bình luận..."
                value={cmtByuser.content}
                onChange={handleChange}
                ></textarea>
                <button className="rating-button" onClick={handleSubmit}>
                Gửi bình luận
                </button>
            </div>
            <div className="listrate-product">
            <ul className="list-rate-product">
                {comment.map((comment, index) => (
                <li key={index} className="list-group-item">
                    <div className="d-flex">
                    <img src="/images/avatar.png" alt="avatar" style={{maxHeight: "50px", borderRadius:"25px"}}/>
                    <div>
                        <span style={{padding:"0 0 0 5px", fontWeight:"500"}}>{comment.userName}</span>
                        <p style={{margin:"0", padding:"0 0 0 5px"}}>{comment.content}</p>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
            </section>
        </div>
    </div>
  );
};

export default Body;
