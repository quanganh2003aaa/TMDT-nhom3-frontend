import React, { useEffect, useState } from "react";
import SideBar from "./side-bar";
import axios from "axios";
import './UserDetail.css'

const Body = () => {
  const idUser = sessionStorage.getItem("idUser");
  const [user, setUser] = useState([]);

  const fecthUserDetail = () => {
    const url=`http://localhost:8080/api/user/id/${idUser}`;
    axios 
      .get(url)
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

  return(
    <div className="udetail">
      <SideBar/>

      <div className="udetail-body"> 
        <div style={{display:"flex", alignItems:"center"}} className="udetail-body-item">
          <img src="/images/avatar.png"></img>
          <h2>{user.name}</h2>
        </div>
        <div className="udetail-body-item">
          <h5>So dien thoai: {user.tel}</h5>
          <h5>Gmail: {user.gmail}</h5>
          <h5>Địa chỉ: {user.district}, {user.ward}, {user.city}</h5>
          <div className="udetail-body-btn"> 
            <button style={{backgroundColor:"#008080"}}>Sửa</button>
            <button style={{backgroundColor:"red"}}>Xóa</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Body;