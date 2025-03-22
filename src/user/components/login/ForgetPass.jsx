import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleEmail = () => {
        setLoading(true);
        axios
            .post("http://localhost:8080/api/user/otp", {gmail: data.gmail})
            .then((response) => {
                if (response.data === true) { 
                    setShowSuccessModal(true);
                    setTimeout(() => {
                        setShowSuccessModal(false);
                    }, 2000);
                } else {
                    alert("Lỗi khi gửi OTP!");
                }
            })
            .catch((error) => {
                console.log("Lỗi gửi gmail: ", error.response.data.message);
                alert(error.response.data.message)
            })
            .finally(() => {
                setLoading(false); 
            });
    }

    const handleSubmit = () => {
        axios
            .post("http://localhost:8080/api/user/newPassword", data)
            .then((response) => {
                if(response.data === true){
                    alert("Cập nhật thành công");
                    navigate("/login");
                } else {
                    alert("Lỗi khi đổi mật khẩu!");
                }
            })
            .catch((error) => {
                console.log("Lỗi update password: ", error.response.data.message);
                alert(error.response.data.message)
            })
    }
    
    const handleChange = (e) => {
        const {id, value} = e.target;
        setData({
            ...data,
            [id]: value
        })
    }

    return(
        <div className="login-body">
            {loading && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="loader"></div>
                        <p>Đang gửi OTP...</p>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Đã gửi OTP thành công!</p>
                    </div>
                </div>
            )}
            <div className="forget-container">
                <div className="forget-header">
                    <h2 className="forget-formTitle">Quên mật khẩu</h2>
                    <p style={{color: "white", margin:"0"}}>Nhập Gmail của bạn để nhận mã xác nhận lấy lại mật khẩu</p>
                </div>

                <form className="forget-form">
                    <div style={{display:"flex", width:"100%"}}>
                        <div className="input-group">
                            <i className="bx bx-envelope"></i>
                            <input type="email" placeholder="Nhập Gmail" id="gmail" onChange={handleChange} />
                        </div>
                        <button className="forget-pass-btnGui" type="button" onClick={handleEmail}>Gửi</button>
                    </div>
                    

                    <div className="input-group">
                        <i className="bx bx-key"></i>
                        <input type="text" placeholder="Nhập mã xác nhận" id="otp" onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <i className="bx bx-lock"></i>
                        <input type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu mới" id="newPassword" onChange={handleChange}/>
                    </div>
                    <div className="show-password" style={{fontSize:"15px"}}>
                    <input
                        type="checkbox"
                        id="showPasswordLogin"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)} 
                    />
                    <label htmlFor="showPasswordLogin" style={{color:"white", marginLeft:"5px"}}>Hiển thị mật khẩu</label>
                    </div>
                    <button type="button" className="forget-submitbtn" onClick={handleSubmit}>Xác Nhận</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;