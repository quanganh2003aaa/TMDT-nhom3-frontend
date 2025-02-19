import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const handleEditRefund = (idRefund) => {
        
      };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Yêu Cầu Hoàn Trả</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/refund">Yêu Cầu Hoàn Trả</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Yêu Cầu Hoàn Trả</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Lí Do</th>
                        <th>Ngày</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={1}>
                            <td style={{padding:"0px 70px"}}>1</td>
                            <td><p>Móp Hộp</p></td>
                            <td><p>15/02/2025</p></td>
                            <td><p>Giao Hàng Thành Công</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditRefund(1)}> 
                                    Phê Duyệt
                                </button>
                                <button type="button" className="btn btn-warning btn-delete-product" style={{}}> 
                                    {/* onClick={() => handleDeleteRefund(product.id)} */}
                                    Hủy
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