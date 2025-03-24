import React, { useState, useEffect } from "react";
import './Vouchers.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Body = () => {
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState([]);

    useEffect(() => {
        const fetchVoucher = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/api/voucher/getAll`);
                const fetchedVoucher = response.data.result || [];

                const updatedVouchers = fetchedVoucher.map(item => {
                    const endDate = new Date(item.endDate);
                    const now = new Date();

                    // Tính thời gian hết hạn
                    const diff = endDate - now;

                    let timeLeftStr = "Đã hết hạn";
                    if (diff > 0) {
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                        const minutes = Math.floor((diff / (1000 * 60)) % 60);
                        timeLeftStr = `${days} ngày, ${hours} giờ, ${minutes} phút`;
                    }

                    // Tính phần trăm còn lại
                    let percentLeft = 0;
                    if (item.maxUsage > 0) {
                        percentLeft = ((item.maxUsage - item.usedCount) / item.maxUsage) * 100;
                        percentLeft = Math.max(percentLeft, 0); // Đảm bảo không âm
                    }

                    return {
                        ...item,
                        timeLeft: timeLeftStr,
                        percentLeft: percentLeft
                    };
                });

                setVoucher(updatedVouchers);
            } catch (error) {
                console.error("Lỗi khi lấy voucher từ API:", error);
            }
        };

        fetchVoucher();
    }, [navigate]);

    return(
        <div>      
            <section className="product">
                <h1 style={{ margin: "20px 10px" }}>Khuyến Mãi</h1>
                <h6 style={{ color: "gray" }}>"Các ưu đãi tốt nhất dành cho bạn"</h6>
            </section>
            <section className="product section-p1">
                <div className="container">
                    <div className="voucher-items">
                        {voucher.length > 0 ?(
                            voucher.map((item, index) => (
                                <div className="voucher-item" key={index}>
                                    <img src={`/images/voucher.png`} alt="Voucher" />
                                    <div className="voucher-infor">
                                        <div className="voucher-header">
                                            <p className="voucher-GiamGia">{item.id}</p>
                                            <p>Đơn tối thiểu {item.minOrderAmount.toLocaleString()}đ VND</p>
                                        </div>
                                        <div className="voucher-progress">
                                            <div className="progress-bar" style={{ width: `${item.percentLeft}%` }}></div>
                                        </div>
                                        <div className="voucher-body">
                                            <p>Còn lại: {item.percentLeft.toFixed(0)}% </p>
                                            <p>Hết hạn sau: {item.timeLeft}</p>
                                        </div>
                                    </div>
                                    <div className="voucher-btn">
                                        <button>Dùng ngay</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Body;