import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Wrapper = () => {
  const [isLoginActive, setIsLoginActive] = useState(true); // Kiểm tra hiển thị form đăng nhập/đăng ký
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
      const response = await axios.post("http://localhost:8080/api/user/login", { tel, password });
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

  // CSS nội tuyến
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#06695D",
    },
    formContainer: {
      width: "800px",
      height: "500px",
      background: "linear-gradient(90deg, #088178, #f2f2f2)",
      borderRadius: "20px",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
      display: "flex",
      overflow: "hidden",
      position: "relative",
      flexDirection: "row-reverse",
    },
    form: {
      width: "50%",
      height: "100%",
      padding: "40px",
      position: "absolute",
      top: 0,
      left: isLoginActive ? "0%" : "50%",
      transition: "all 0.5s ease",
      opacity: isLoginActive ? 1 : 0,
      zIndex: isLoginActive ? 2 : 1,
    },
    registerForm: {
      width: "50%",
      padding: "40px",
      position: "absolute",
      top: 0,
      left: isLoginActive ? "-100%" : "0%",
      transition: "all 0.5s ease",
      opacity: isLoginActive ? 0 : 1,
      zIndex: isLoginActive ? 1 : 2,
    },
    formTitle: {
      fontSize: "37px",
      marginBottom: "20px",
      color: "#fff",
      textAlign: "center",
      fontWeight: 700,
    },
    input: {
      width: "100%",
      height: "40px",
      padding: "0 15px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "20px",
    },
    button: {
      width: "100%",
      height: "45px",
      background: "#088178",
      color: "#fff",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
    },
    toggleText: {
      textAlign: "center",
      marginTop: "10px",
      color: "#fff",
    },
    toggleLink: {
      color: "#ffcc00",
      cursor: "pointer",
      textDecoration: "underline",
    },
    imageContainer: {
      flex: 1,
      backgroundImage: "url('./images/noen.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "absolute",
      width: "50%",
      height: "100%",
      
    },
    welcomeText: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontSize: "36px",
      color: "#fff",
      fontFamily: "'Parisienne', cursive",
      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h2 style={styles.formTitle}>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Số Điện Thoại"
              style={styles.input}
              value={loginForm.tel}
              onChange={(e) => setLoginForm({ ...loginForm, tel: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mật Khẩu"
              style={styles.input}
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button type="submit" style={styles.button}>
              Đăng Nhập
            </button>
            <p style={styles.toggleText}>
              Bạn chưa có tài khoản?{" "}
              <span style={styles.toggleLink} onClick={toggleForms}>
                Đăng ký
              </span>
            </p>
          </form>
        </div>
        <div style={styles.registerForm}>
          <h2 style={styles.formTitle}>Đăng ký</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Tên Tài Khoản"
              style={styles.input}
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Số Điện Thoại"
              style={styles.input}
              value={registerForm.tel}
              onChange={(e) => setRegisterForm({ ...registerForm, tel: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mật Khẩu"
              style={styles.input}
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <button type="submit" style={styles.button}>
              Đăng Ký
            </button>
            <p style={styles.toggleText}>
              Bạn đã có tài khoản?{" "}
              <span style={styles.toggleLink} onClick={toggleForms}>
                Đăng nhập
              </span>
            </p>
          </form>
        </div>
        <div style={styles.imageContainer}>
          <h2 style={styles.welcomeText}>Welcome</h2>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
