import React, { useEffect, useState } from "react";
import SideBar from "./side-bar";
import axios from "axios";
import './UserDetail.css'
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");
  const fecthUserDetail = () => {
    const url=`http://localhost:8080/api/user/id/${idUser}`;
    axios 
      .get(url, {
        headers: { 
            "Author": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
      .then((response) => {
        setUser(response.data.result)
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        
      })
  }

  useEffect( () => {
    fecthUserDetail();
  }, [])

  const handleUpdate = () => {
    navigate("/user-detail/update");
  }

  return(
    <div className="udetail">
      <SideBar/>
      <div className="udetail-body"> 
        <div style={{display:"flex", alignItems:"center"}} className="udetail-body-item">
          <img src="/images/avatar.png"></img>
          <h2>{user.name}</h2>
        </div>
        <div className="udetail-body-item">
          <h5 style={{color: "#515151"}}>Số điện thoại: {user.tel}</h5>
          <h5 style={{color: "#515151"}}>Gmail: {user.gmail}</h5>
          <h5 style={{color: "#515151"}}>Địa chỉ: {user.district}, {user.ward}, {user.city}</h5>
          <div className="udetail-body-btn"> 
            <button type="button" style={{backgroundColor:"#008080"}} onClick={handleUpdate}>Sửa</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Body;