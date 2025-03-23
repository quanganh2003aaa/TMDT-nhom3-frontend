import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./side-bar";
import './UserDetail.css'

const Body = () => {
    const [comment, setComment] = useState([]);
    const token = sessionStorage.getItem("token");
    const idUser = sessionStorage.getItem("idUser");

    useEffect(() => {
        if (!token || !idUser) {
          alert("Bạn cần đăng nhập để truy cập trang này!");
          window.location.href = "/login";
          return; 
        }
        fetchComment();
    }, [token, idUser]);
      
    const fetchComment = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comment/user/${idUser}`
        );
        setComment(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error.response.data.message);
        alert("Lỗi khi lấy danh sách bình luận!");
      }
    };
      
    const handleDelete = (idBlog) => {
      axios
        .delete(`http://localhost:8080/api/comment/delete/${idBlog}`)
        .then(() => {
          alert("Xóa bình luận thành công");
          fetchComment();
        })
        .catch((error) => {
          console.log("Lỗi xóa sản phẩm: ", error.response.data.message);
        })
    }
      
  return(
    <div className="udetail">
      <SideBar/>

      <div className="tab-content col-8" >
            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"
                tabindex="0">
            <table className="table table-orders">
                <thead>
                <tr>
                    <th scope="col" style={{textAlign:"center"}}>Mã bình luận</th>
                    <th scope="col" style={{textAlign:"center"}}>Ngày/ Tháng/ Năm</th>
                    <th scope="col" style={{textAlign:"center"}}>Người viết</th>
                    <th scope="col" style={{textAlign:"center"}}>Nội dung</th>
                    <th scope="col" style={{textAlign:"center"}}>Thao tác</th>
                </tr>
                </thead>
                <tbody >
                {comment.length > 0 ? 
                  (comment.map((comment) => (
                      <tr key={comment.id}>
                          <td style={{textAlign:"center"}}>{comment.id}</td>
                          <td style={{textAlign:"center"}}>{comment.createdAt}</td>
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
                            Bạn chưa có bình luận nào
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
          
        </div>
      
    </div>
  );
};

export default Body;