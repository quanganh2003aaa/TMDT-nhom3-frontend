import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    return(
        <div className="login-body">
            <div className="forget-container">
                <div className="forget-header">
                    <h2 className="forget-formTitle">Quên mật khẩu</h2>
                    <p style={{color: "white"}}>Nhập Gmail của bạn để nhận mã xác nhận lấy lại mật khẩu</p>
                </div>

                <form className="forget-form">
                    <div className="input-group">
                        <i className="bx bx-envelope"></i>
                        <input type="email" placeholder="Nhập Gmail" />
                        <button className="send-btn">Gửi</button>
                    </div>

                    <div className="input-group">
                        <i className="bx bx-key"></i>
                        <input type="text" placeholder="Nhập mã xác nhận" />
                    </div>

                    <div className="input-group">
                        <i className="bx bx-lock"></i>
                        <input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>

                    <button className="login-button" style={{width:"300px", marginTop:"30px"}}>Xác Nhận</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;