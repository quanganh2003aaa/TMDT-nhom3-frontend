import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    const [deliver, setDeliver] = useState([]);

    const fetchDeliver = () => {
        axios 
            .get("http://localhost:8080/api/delivery/getAll")
            .then((response) => {
                setDeliver(response.data.result);
            })
            .catch((error) => {
                const errorMessage = error.response.data.Message;
                console.log(errorMessage);
            })
    }

    const handleEditDeli = (idDeli) => {
        navigate(`/admin/update-deliver/${idDeli}`);  
      };

    const deleteDeliver = (idDeli) => {
        axios 
            .delete(`http://localhost:8080/api/delivery/delete/${idDeli}`)
            .catch((error) => {
                const errorMessage = error.response.data.Message;
                console.log(errorMessage);
            })
    }

    useEffect(()=>{
        fetchDeliver();
    }, [])

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Hình Thức Giao Hàng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/deliver">Hình Thức Giao Hàng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-deliver">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Hình Thức Giao Hàng</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Thông Tin</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                        {deliver.map((deliver) => (
                            <tr key={deliver.id}>
                                <td style={{padding:"0px 70px"}}>{deliver.id}</td>
                                <td><p>{deliver.name}</p></td>
                                <td><p>{deliver.price}</p></td>
                                <td><p>{deliver.info}</p></td>
                                <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                    <div>
                                        <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditDeli(deliver.id)}> 
                                            
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    <button type="button" className="btn btn-warning btn-delete-product" onClick={deleteDeliver(deliver.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>   
            </div>
        </main>
    );
};

export default Main;