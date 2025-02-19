import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Thương Hiệu</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/thuonghieu">Thương Hiệu</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-thuonghieu">Sửa Thương Hiệu</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                <div className="row">
                        <label htmlFor="user-name" className="col-form-label" style={{padding:"10px"}}>Tên thương hiệu:</label>
                        <textarea className="txt-input form-control" id="user-name"></textarea>

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/thuonghieu">
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