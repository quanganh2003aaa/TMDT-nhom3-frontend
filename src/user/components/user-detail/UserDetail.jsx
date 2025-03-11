import React, { useState } from "react";
import SideBar from "./side-bar";
import './UserDetail.css'

const Body = () => {
  return(
    <div className="udetail">
      <SideBar/>

      <div className="udetail-body"> 
        <div style={{display:"flex", alignItems:"center"}} className="udetail-body-item">
          <img src="/images/avatar.png"></img>
          <h2>Nguyen Tan Hung</h2>
        </div>
        <div className="udetail-body-item">
          <h5>So dien thoai: 0869507729</h5>
          <h5>Gmail: hungngtan03@gmail.com</h5>
          <h5>Địa chỉ: Đống Đa, Hà Nội</h5>
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