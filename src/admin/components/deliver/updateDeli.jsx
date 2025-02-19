import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
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
                        <label htmlFor="user-head" className="col-form-label" style={{padding:"10px"}}>Tên:</label>
                        <textarea className="txt-input form-control" id="user-head"></textarea>

                        <label htmlFor="user-head" className="col-form-label" style={{padding:"10px"}}>Giá:</label>
                        <textarea className="txt-input form-control" id="user-head"></textarea>

                        <label htmlFor="date-start" className="col-form-label" style={{padding:"10px"}}>Thông Tin:</label>
                        <input type="date" id="date-start" name="date" min={new Date().toISOString().split("T")[0]} style={{padding:"10px"}}/>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/deliver">
                                <button  className="btn-huy">Hủy</button>
                            </a>
                            <button className="btn-them">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;