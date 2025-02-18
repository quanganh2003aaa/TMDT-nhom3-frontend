import React from "react";
import './user.css'

const CreateUser = () => {
    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Admin</h1>
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
                            <a className="active" href="/admin/create-user">Tạo Admin</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row" style={{padding:"50px"}}>
                        <label htmlFor="user-name" className="col-form-label" style={{padding:"10px"}}>Tên tài khoản:</label>
                        <textarea className="txt-input form-control" id="user-name"></textarea>

                        <label htmlFor="user-phone" className="col-form-label" style={{padding:"10px"}}>Số điện thoại:</label>
                        <textarea className="txt-input form-control" id="user-phone"></textarea>

                        <label htmlFor="user-password" className="col-form-label" style={{padding:"10px"}}>Mật khẩu:</label>
                        <textarea className="txt-input form-control" id="user-password"></textarea>

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/user">
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

export default CreateUser;