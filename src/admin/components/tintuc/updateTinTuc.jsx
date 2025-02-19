import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Tin Tức</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/tintuc">Tin Tức</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-tintuc">Sửa Tin Tức</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <label htmlFor="user-head" className="col-form-label" style={{padding:"10px"}}>Tiêu Đề:</label>
                        <textarea className="txt-input form-control" id="user-head"></textarea>

                        <label htmlFor="date-start" className="col-form-label" style={{padding:"10px"}}>Ngày:</label>
                        <input type="date" id="date-start" name="date" min={new Date().toISOString().split("T")[0]} style={{padding:"10px"}}/>

                        <label htmlFor="user-name" className="col-form-label" style={{padding:"10px"}}>Tác Giả:</label>
                        <textarea className="txt-input form-control" id="user-name"></textarea>

                        <label htmlFor="user-body" className="col-form-label" style={{padding:"30px"}}>Nội Dung:</label>
                        <textarea className="txt-input form-control" id="user-body"></textarea>

                        <div className="btn-form" style={{paddingTop:"10px"}}>
                            <a href="/admin/tintuc">
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