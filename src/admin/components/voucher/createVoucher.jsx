import React, { useState } from "react";
import './voucher.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateUser = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Thêm Mã Giảm Giá</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/voucher">Mã Giảm Giá</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-voucher">Thêm Mã Giảm Giá</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="column" style={{display:"flex", justifyContent:"space-between"}}>
                        <div className="row" style={{padding:"50px"}}>
                            <label htmlFor="voucher-name" className="col-form-label" style={{padding:"10px"}}>Giá Trị:</label>
                            <textarea className="txt-input form-control" id="voucher-name"></textarea>

                            <label htmlFor="voucher-phone" className="col-form-label" style={{padding:"10px"}}>Tối Thiểu:</label>
                            <textarea className="txt-input form-control" id="voucher-phone"></textarea>

                            <label htmlFor="voucher-password" className="col-form-label" style={{padding:"10px"}}>Số Lượng:</label>
                            <textarea className="txt-input form-control" id="voucher-password"></textarea>                            
                        </div>

                        <div className="row" style={{padding:"50px"}}>
                            <label htmlFor="date-start" className="col-form-label" style={{padding:"10px"}}>Ngày Bắt Đầu:</label>
                            <input type="date" id="date-start" name="date" min={new Date().toISOString().split("T")[0]} style={{padding:"10px"}}/>                          

                            <label htmlFor="date-end" className="col-form-label" style={{padding:"10px"}}>Ngày Kết Thúc:</label>
                            <input type="date" id="date-end" name="date" min={new Date().toISOString().split("T")[0]} style={{padding:"10px"}}/>  

                            <label htmlFor="voucher" className="col-form-label" style={{padding:"10px"}}>Mã:</label>
                            <textarea className="txt-input form-control" id="voucher"></textarea>

                            <div className="btn-form" style={{paddingTop:"40px"}}>
                                <a href="/admin/voucher">
                                    <button  className="btn-huy">Hủy</button>
                                </a>
                                <button className="btn-them">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateUser;