import React, { useState, useEffect } from "react";
import './Vouchers.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Body = () => {
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState([]);
    const [percentLeft, setpercentLeft] = useState(0);

    useEffect(() => {
        const fetchVoucher = async () => {
          const idUser = sessionStorage.getItem("idUser");
          if (!idUser) {
            alert("Bạn cần đăng nhập để xem voucher!");
            navigate("/login");
            return;
          }
    
          try {
            const response = await axios.get(`http://localhost:8080/api/voucher/getAll`);
            const fetchedVoucher = response.data.result || [];
            const maxUsage = response.data.result.maxUsage;
            const usedCount = response.data.result.usedCount;
            let percent = 0;
            if(maxUsage == usedCount){
                percent = 0
            }else{
                percent = ((maxUsage - usedCount)/maxUsage) *100;
            }
            const updatedVouchers = fetchedVoucher.map(item => {
                const endDate = new Date(item.endDate); 
                const now = new Date(); 

                // Tính số mili giây còn lại
                const diff = endDate - now;

                if (diff <= 0) {
                    return { ...item, timeLeft: "Đã hết hạn" };
                }

                // Chuyển đổi thành ngày, giờ, phút
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);

                return {
                    ...item,
                    timeLeft: `${days} ngày, ${hours} giờ, ${minutes} phút`
                };
            });

            setpercentLeft(percent);
            setVoucher(updatedVouchers);
          } catch (error) {
            console.error("Lỗi khi lấy voucher từ API:", error);
          }
        };
    
        fetchVoucher();
      }, [navigate]);

    return(
        <div>      
            <section className="product section-p1">
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
                                            <div className="progress-bar" style={{ width: `${percentLeft}%` }}></div>
                                        </div>
                                        <div className="voucher-body">
                                            <p>Còn lại: {percentLeft.toFixed(0)}% </p>
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