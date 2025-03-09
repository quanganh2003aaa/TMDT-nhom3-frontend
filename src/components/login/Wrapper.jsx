import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './login.css'

const Wrapper = () => {
  const [isLoginActive, setIsLoginActive] = useState(true); 
  const [loginForm, setLoginForm] = useState({ tel: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ tel: "", password: "", name: "" });

  // Toggle giữa login và register form
  const toggleForms = () => {
    setIsLoginActive(!isLoginActive);
  };

  // Xử lý logic đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();
    const { tel, password } = loginForm;

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
        alert("Đăng nhập thành công!");
        window.location.href = decodedToken.scope === "ADMIN" ? "/admin/admin" : "/home";
      }
    } catch (error) {
      alert("Đăng nhập thất bại!");
      console.error("Đăng nhập lỗi:", error);
    }
  };

  // Xử lý logic đăng ký
  const handleRegister = async (event) => {
    event.preventDefault();
    const { tel, password, name } = registerForm;

    if (!tel || !password || !name) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/create", { tel, password, name });
      if (response.data.code === 200) {
        alert("Đăng ký tài khoản thành công!");
        setIsLoginActive(true); // Chuyển về màn hình đăng nhập
      }
    } catch (error) {
      alert("Đăng ký thất bại!");
      console.error("Đăng ký lỗi:", error);
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
              type="password"
              placeholder="Mật Khẩu"
              className="login-input"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button type="submit" className="login-button">
              Đăng Nhập
            </button>
            <p className="login-toggle-text">
              Bạn chưa có tài khoản?{" "}
              <span className="login-toggle-link" onClick={toggleForms}>
                Đăng ký
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
