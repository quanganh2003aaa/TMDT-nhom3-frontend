import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./side-bar";
import './UserDetail.css'
import './UserDetailCu.css'

const Body = () => {
    const [rate, setRate] = useState([]);
    const token = sessionStorage.getItem("token");
    const idUser = sessionStorage.getItem("idUser");

    useEffect(() => {
        if (!token || !idUser) {
          alert("Bạn cần đăng nhập để truy cập trang này!");
          window.location.href = "/login";
          return; 
        }
        fetchRate();
    }, [token, idUser]);
      
    const fetchRate = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/rate/user/${idUser}`
        );
        const data = response.data?.result?.objectList || []; 
        setRate(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error.response.data.message);
      }
    };
      
    const handleDelete = (idRate) => {
      axios
        .delete(`http://localhost:8080/api/rate/delete/${idRate}`)
        .then(() => {
          alert("Xóa đánh giá thành công");
          fetchRate();
        })
        .catch((error) => {
          console.log("Lỗi xóa đánh giá: ", error.response.data.message);
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
                    <th scope="col" style={{textAlign:"center"}}>Mã đánh giá</th>
                    <th scope="col" style={{textAlign:"center"}}>Đánh giá</th>
                    <th scope="col" style={{textAlign:"center"}}>Ngày/ Tháng/ Năm</th>
                    <th scope="col" style={{textAlign:"center"}}>Người viết</th>
                    <th scope="col" style={{textAlign:"center"}}>Nội dung</th>
                    <th scope="col" style={{textAlign:"center"}}>Thao tác</th>
                </tr>
                </thead>
                <tbody >
                {rate.length >= 0 ? 
                  (rate.map((rate, index) => (
                      <tr key={index + 1}>
                          <td style={{textAlign:"center"}}>{index + 1}</td>
                          <td style={{textAlign:"center"}}>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              key={value}
                              style={{fontSize:"25px"}}
                              className={`star-icon ${rate.rate >= value ? "active" : ""}`}
                            >
                              ★
                            </span>
                          ))}
                          </td>
                          <td style={{textAlign:"center"}}>{new Date(rate.createdDate).toLocaleDateString("vi-VN")}</td>
                          <td style={{textAlign:"center"}}>{rate.user}</td>
                          <td style={{textAlign:"center"}}>{rate.content}</td>
                          <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px", justifyContent:"space-around"}} >
                            <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDelete(rate.id)}>                                     
                                <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                      </tr>
                  ))) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
                            Bạn chưa có đánh giá nào
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