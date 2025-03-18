import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Await, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { idDeli } = useParams();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [deliver, setDeliver] = useState([]);

    const fetchDeliver = () => {
        axios 
            .get(`http://localhost:8080/api/delivery/${idDeli}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setDeliver(response.data.result);
            })
            .catch((error) => {
                const errorMessage = error.response.data.Message;
                console.log(errorMessage);
            })
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDeliver({
            ...deliver,
            [id]: value
        });
    };

    const handleHuy = () => {
        navigate("/admin/deliver");
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/delivery/update/${idDeli}`, deliver, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật thành công!");
            navigate("/admin/deliver");
        } catch (error) {
            console.error("Error updating delivery:", error);
        }
    }

    useEffect(() => {
        fetchDeliver();

    }, []);

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Hình Thức Giao Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/deliver">Hình Thức Giao Hàng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-deliver">Sửa Hình Thức Giao Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label" style={{padding:"10px"}}>Tên:</label>
                        <textarea className="txt-input form-control" value={deliver.name} id="name" onChange={handleChange}></textarea>

                        <label htmlFor="price" className="col-form-label" style={{padding:"10px"}}>Giá:</label>
                        <textarea className="txt-input form-control" value={deliver.price} id="price" onChange={handleChange}></textarea>

                        <label htmlFor="info" className="col-form-label" style={{padding:"10px"}}>Thông Tin:</label>
                        <textarea className="txt-input form-control" value={deliver.info} id="info" onChange={handleChange}></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/deliver">
                                <button  className="btn-huy" onClick={handleHuy}>Hủy</button>
                            </a>
                            <button className="btn-them" onClick={handleUpdate}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;