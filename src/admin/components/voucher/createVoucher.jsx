import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const token = sessionStorage.getItem('token');
    useEffect(() => {
            fetch("http://localhost:8080/api/auth/introspect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.result.valid || data.result.scope !== "ADMIN") {
                    window.location.href = "/admin/404";
                }
            })
            .catch(() => window.location.href = "/admin/404");
        }, []);


    const navigate = useNavigate();
    const [voucherData, setVoucherData] = useState({
        id: '',
        discountValue: '',
        minOrderAmount: '',
        startDate: '',
        endDate: '',
        maxUsage: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setVoucherData({
            ...voucherData,
            [id]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const formattedData = {
                id: voucherData.id,
                discountValue: Number(voucherData.discountValue),
                minOrderAmount: Number(voucherData.minOrderAmount),
                startDate: new Date(voucherData.startDate).toISOString(),
                endDate: new Date(voucherData.endDate).toISOString(),
                maxUsage: Number(voucherData.maxUsage)
            };

            await axios.post('http://localhost:8080/api/voucher/create', formattedData, {
                headers: { Author: `Bearer ${token}`,
                            "Content-Type": "application/json", }});
            alert('Mã giảm giá đã được tạo thành công!');
            navigate('/admin/voucher');
        } catch (error) {
            console.error('Lỗi khi tạo mã giảm giá:', error);
            alert('Lỗi khi tạo mã giảm giá.');
        }
    };

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
                            <label htmlFor="discountValue" className="col-form-label" style={{padding:"10px"}}>Giá Trị:</label>
                            <textarea className="txt-input form-control" id="discountValue" value={voucherData.discountValue} onChange={handleChange}></textarea>

                            <label htmlFor="minOrderAmount" className="col-form-label" style={{padding:"10px"}}>Tối Thiểu:</label>
                            <textarea className="txt-input form-control" id="minOrderAmount" value={voucherData.minOrderAmount} onChange={handleChange}></textarea>

                            <label htmlFor="maxUsage" className="col-form-label" style={{padding:"10px"}}>Số Lượng:</label>
                            <textarea className="txt-input form-control" id="maxUsage" value={voucherData.maxUsage} onChange={handleChange}></textarea>                            
                        </div>

                        <div className="row" style={{padding:"50px"}}>
                            <label htmlFor="startDate" className="col-form-label" style={{padding:"10px"}}>Ngày Bắt Đầu:</label>
                            <input type="date" id="startDate" name="date" min={new Date().toISOString().split("T")[0]} value={voucherData.startDate} onChange={handleChange} style={{padding:"10px"}}/>                          

                            <label htmlFor="endDate" className="col-form-label" style={{padding:"10px"}}>Ngày Kết Thúc:</label>
                            <input type="date" id="endDate" name="date" min={new Date().toISOString().split("T")[0]} value={voucherData.endDate} onChange={handleChange} style={{padding:"10px"}}/>  

                            <label htmlFor="id" className="col-form-label" style={{padding:"10px"}}>Mã:</label>
                            <textarea className="txt-input form-control" id="id" value={voucherData.id} onChange={handleChange}></textarea>

                            <div className="btn-form" style={{paddingTop:"40px"}}>
                                <a href="/admin/voucher">
                                    <button className="btn-huy">Hủy</button>
                                </a>
                                <button className="btn-them" onClick={handleSubmit}>Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateUser;