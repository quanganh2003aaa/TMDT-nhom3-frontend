import React, {useEffect, useState }  from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from "axios";
import './user.css'

const UpdateUser = () => {
    const { idUser } = useParams();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    
    const fetchUser = () => {
        axios .get(
            `http://localhost:8080/api/user/id/${idUser}`
        )
        .then((respone) => {
            setUser(respone.data.result)
        })
        .catch((error) => console.error("Error fetching User: ", error))
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }

    const handleHuy = () => {
        navigate("/admin/user");
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/user/updateAdmin/${idUser}`, user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật thành công!");
            navigate("/admin/user");
        } catch (error) {
            console.error("Error updating delivery:", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Chỉnh Sửa Thông Tin </h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/user">Người dùng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-user">Chỉnh Sửa Thông Tin</a>
                        </li>
                    </ul>
                </div>
            </div>
                <div className="board">
                    <div className="board1" style={{padding:"40px"}}>
                        <div className="row">
                            <div>
                                <label htmlFor="name" className="col-form-label">Họ và Tên:</label>
                                <textarea className="txt-input form-control" value={user.name} onChange={handleChange} id="name"></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <label htmlFor="gmail" className="col-form-label">Email:</label>
                                <textarea className="txt-input form-control" value={user.gmail} onChange={handleChange} id="gmail"></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <label htmlFor="tel" className="col-form-label">Số điện thoại:</label>
                                <textarea className="txt-input form-control" value={user.tel} onChange={handleChange} id="tel"></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div style={{display:"flex", justifyContent:"flex-end", padding:"10px"}}>
                                <button className="btn btn-huy" style={{padding:"8px 30px", marginRight:"20px"}} onClick={handleHuy}>Hủy</button>
                                <button className="btn btn-them" style={{padding:"8px 30px"}} onClick={handleUpdate}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>            
        </main>
    );
};

export default UpdateUser;