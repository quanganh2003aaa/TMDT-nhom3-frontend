import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {idStore} = useParams();
    const navigate = useNavigate();
    const [store, setStore] = useState([]);

    const fecthStore = () => {
        axios
            .get(`http://localhost:8080/api/store/id/${idStore}`)
            .then((response) => {
                setStore(response.data.result);
            })
            .catch((error) => {
                console.log("Lỗi fecth store detail: ", error.response.data.message);
            })
    }

    useEffect( () => {
        fecthStore();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setStore({
            ...store,
            [id]: value
        });
    };

    const handleHuy = () => {
        navigate("/admin/shop");
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("address", store.address);
        formData.append("tel", store.tel);

        try{
            axios .put(`http://localhost:8080/api/store/update/${idStore}`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((res) => {
                alert("Cập nhật cửa hàng thành công");
                navigate("/admin/shop");
            })
        }catch (error) {
            alert("Lỗi cập nhật store");
            console.log("Lỗi cập nhật store", error);
        }
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Cửa Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/shop">Cửa Hàng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-shop">Sửa Cửa Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="user" className="col-form-label" style={{padding:"10px"}}>Quản Lý Cửa Hàng:</label>
                        <textarea className="txt-input form-control" value={store.user} readOnly id="user"></textarea>

                        <label htmlFor="address" className="col-form-label" style={{padding:"10px"}}>Địa Chỉ:</label>
                        <textarea className="txt-input form-control" value={store.address} onChange={handleChange} id="address"></textarea>

                        <label htmlFor="tel" className="col-form-label" style={{padding:"10px"}}>Số Điện Thoại:</label>
                        <textarea className="txt-input form-control" value={store.tel} onChange={handleChange} id="tel"></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <button className="btn-huy" onClick={handleHuy}>Hủy</button>
                            <button className="btn-them" onClick={handleUpdate}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;