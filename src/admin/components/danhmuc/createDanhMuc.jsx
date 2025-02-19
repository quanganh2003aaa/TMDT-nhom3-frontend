import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Danh Mục</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/danhmuc">Danh Mục</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-danhmuc">Tạo Danh Mục</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="user-head" className="col-form-label" style={{padding:"10px"}}>Danh Mục:</label>
                        <textarea className="txt-input form-control" id="user-head"></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/danhmuc">
                                <button  className="btn-huy">Hủy</button>
                            </a>
                            <button className="btn-them">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;