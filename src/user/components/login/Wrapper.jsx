import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './login.css'
import { useNavigate } from "react-router-dom";

const Wrapper = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true); 
  const [loginForm, setLoginForm] = useState({ tel: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name:"", tel: "", password: "", gmail: "" });
  const [showPassword, setShowPassword] = useState(false);

  const toggleForms = () => {
    setIsLoginActive(!isLoginActive);
  };

  const ForgetPass = () => {
    navigate("/forget-password");
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const tel = loginForm.tel.trim();
    const password = loginForm.password.trim();

    if (!tel || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", { tel, password });
      if (response.data.code === 200) {
        const decodedToken = jwtDecode(response.data.result.token);
        sessionStorage.setItem("token", response.data.result.token);
        sessionStorage.setItem("idUser", response.data.result.id);
        window.location.href = decodedToken.scope === "ADMIN" ? "/admin/admin" : "/home";
      }
    } catch (error) {
      const errorMessage = error.response.data.message
      alert(`Đăng nhập thất bại: ${errorMessage}`);
      console.error("Đăng nhập lỗi:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = registerForm.name.trim();
    const tel = registerForm.tel.trim();
    const password = registerForm.password.trim();
    const gmail = registerForm.gmail.trim();

    if (!name || !tel || !password || !gmail) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/create", {name, tel, password, gmail });
      if (response.data.code === 200) {
        alert("Đăng ký tài khoản thành công!");
        setRegisterForm({ name: "", tel: "", password: "", gmail: "" });
        setLoginForm({tel: "", password: "" });
        setIsLoginActive(true); 
      }
    } catch (error) {
      const errorMessage = error.response.data.message
      alert(`Đăng ký thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className={`login-signinform ${isLoginActive ? "login-active" : ""}`}>
          <h2 className="login-formTitle">Đăng nhập</h2>
          <form onSubmit={handleLogin}>
              <input
                type="tel"
                placeholder="Số Điện Thoại"
                className="login-input"
                value={loginForm.tel}
                onChange={(e) => setLoginForm({ ...loginForm, tel: e.target.value })}
              />            
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật Khẩu"
              className="login-input"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <div className="show-password" style={{marginLeft:"5px", fontSize:"15px"}}>
              <input
                type="checkbox"
                id="showPasswordLogin"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPasswordLogin" style={{color:"white", marginLeft:"5px"}}>Hiển thị mật khẩu</label>
            </div>
            <button onClick={handleLogin} className="login-button">
              Đăng Nhập
            </button>
            <p className="login-toggle-text">
              Bạn chưa có tài khoản?{" "}
              <span className="login-toggle-link" onClick={toggleForms}>
                Đăng ký
              </span>
              <span className="login-toggle-link" onClick={ForgetPass}>
              Quên mật khẩu?
              </span>
            </p>
          </form>
        </div>
        
        <div className={`login-registerform ${!isLoginActive ? "login-register-active" : ""}`}>
          <h2 className="login-formTitle">Đăng ký</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Tên Tài Khoản"
              className="login-input"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Số Điện Thoại"
              className="login-input"
              value={registerForm.tel}
              onChange={(e) => setRegisterForm({ ...registerForm, tel: e.target.value })}
            />
            <input
              type="email"
              placeholder="Gmail"
              className="login-input"
              value={registerForm.gmail}
              onChange={(e) => setRegisterForm({ ...registerForm, gmail: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mật Khẩu"
              className="login-input"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <button type="submit" className="login-button">
              Đăng Ký
            </button>
            <p className="login-toggle-text">
              Bạn đã có tài khoản?{" "}
              <span className="login-toggle-link" onClick={toggleForms}>
                Đăng nhập
              </span>
            </p>
          </form>
        </div>
        <div className={`login-img-container ${isLoginActive ? "" : "login-img-move-left"}`}>
          <h2 className="login-welcome-text">Welcome</h2>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
