import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const handleEditDeli = (idDeli) => {
        navigate(`/admin/update-deliver`);  //  /${idProduct}
      };

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
                    <tr key={1}>
                            <td style={{padding:"0px 70px"}}>1</td>
                            <td><p>Giao Hàng Nhanh </p></td>
                            <td><p>30.000 đ</p></td>
                            <td><p>1-3 ngày</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditDeli(1)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" style={{}}> 
                                    {/* onClick={() => handleDeleteDeli(product.id)} */}
                                <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    {/* {products.map((product) => (
                        
                    ))} */}
                    </tbody>
                </table>
                </div>   
            </div>
        </main>
    );
};

export default Main;