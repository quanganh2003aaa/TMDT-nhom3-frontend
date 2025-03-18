import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./voucher.css";

const CreateVoucher = () => {
    const { idVoucher } = useParams();  
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const [voucherData, setVoucherData] = useState({
            id: '',
            discountValue: '',
            minOrderAmount: '',
            startDate: '',
            endDate: '',
            maxUsage: '',
            usedCount: ''
        });
    
        const handleChange = (e) => {
            const { id, value } = e.target;
            setVoucherData({
                ...voucherData,
                [id]: value
            });
        };

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/voucher/getById/${idVoucher}`, {
                    // headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data.result;

                setVoucherData({
                    id: data.id,
                    discountValue: data.discountValue,
                    minOrderAmount: data.minOrderAmount,
                    startDate: data.startDate.split("T")[0], 
                    endDate: data.endDate.split("T")[0],
                    maxUsage: data.maxUsage,
                    usedCount: data.usedCount
                });
            } catch (error) {
                console.error("Error fetching voucher:", error);
            }
        };

        fetchVoucher();
    }, [idVoucher, token]);

    const handleSubmit = async () => {
        const updatedData = {
            ...voucherData,
            startDate: formatDateTime(voucherData.startDate),
            endDate: formatDateTime(voucherData.endDate, true)
        };

        try {
            await axios.put(`http://localhost:8080/api/voucher/update/${idVoucher}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật thành công!");
            navigate("/admin/voucher");
        } catch (error) {
            console.error("Error updating voucher:", error);
        }
    };

    const formatDateTime = (date, isEndDate = false) => {
        return `${date}T${isEndDate ? "23:59:59" : "00:00:00"}`;
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Mã Giảm Giá</h1>
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
                            <a className="active">Sửa Mã Giảm Giá</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="column" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="row" style={{ padding: "50px" }}>
                            <label htmlFor="discountValue" className="col-form-label" style={{ padding: "10px" }}>Giá Trị:</label>
                            <textarea className="txt-input form-control" id="discountValue" value={voucherData.discountValue} onChange={handleChange}></textarea>

                            <label htmlFor="minOrderAmount" className="col-form-label" style={{ padding: "30px 0 0 10px" }}>Tối Thiểu:</label>
                            <textarea className="txt-input form-control" id="minOrderAmount" value={voucherData.minOrderAmount} onChange={handleChange}></textarea>

                            <label htmlFor="maxUsage" className="col-form-label" style={{ padding: "10px" }}>Số Lượng:</label>
                            <textarea className="txt-input form-control" id="maxUsage" value={voucherData.maxUsage} onChange={handleChange}></textarea>
                        </div>

                        <div className="row" style={{ padding: "50px" }}>
                            <label htmlFor="startDate" className="col-form-label" style={{ padding: "10px" }}>Ngày Bắt Đầu:</label>
                            <input type="date" id="startDate" name="date" value={voucherData.startDate} onChange={handleChange} style={{ padding: "10px" }} />

                            <label htmlFor="endDate" className="col-form-label" style={{ padding: "10px" }}>Ngày Kết Thúc:</label>
                            <input type="date" id="endDate" name="date" value={voucherData.endDate} onChange={handleChange} style={{ padding: "10px" }} />

                            <label htmlFor="used" className="col-form-label" style={{ padding: "10px" }}>Đã Dùng:</label>
                            <textarea className="txt-input form-control" id="usedCount" value={voucherData.usedCount} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="btn-form" >
                        <a href="/admin/voucher">
                            <button  className="btn-huy">Hủy</button>
                        </a>
                        <button className="btn-them" onClick={handleSubmit}>Lưu</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateVoucher;