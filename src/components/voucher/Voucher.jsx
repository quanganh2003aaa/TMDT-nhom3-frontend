import React from "react";
import './Vouchers.css'

const Body = () => {
    const total = 100;
    const used = 40;
    const percentLeft = ((total-used)/total) *100;
    return(
        <div>      
            <section className="product section-p1">
                <h1 style={{ margin: "20px 10px" }}>Khuyến Mãi</h1>
                <h6 style={{ color: "gray" }}>"Các ưu đãi tốt nhất dành cho bạn"</h6>
            </section>
            <section className="product section-p1">
                <div className="container">
                    <div className="voucher-items">
                        <div className="voucher-item">
                        <img src={`/images/voucher.png`} alt="Voucher" />
                            <div className="voucher-infor">
                                <div className="voucher-header">
                                    <p className="voucher-GiamGia">Giảm Giá</p>
                                    <p>Giảm 500K Đơn tối thiểu 0K</p>
                                </div>
                                <div className="voucher-progress">
                                    <div className="progress-bar" style={{ width: `${percentLeft}%` }}></div>
                                </div>
                                <div className="voucher-body">
                                    <p>Còn lại: {percentLeft.toFixed(0)}% </p>
                                    <p>Hết hạn sau: 15 giờ</p>
                                </div>
                            </div>
                            <div className="voucher-btn">
                                <button>Dùng ngay</button>
                            </div>
                        </div>

                        <div className="voucher-item">
                            <img src={`/images/voucher.png`} alt="Voucher" />
                            <div className="voucher-infor">
                                <div className="voucher-header">
                                    <p className="voucher-GiamGia">Giảm Giá</p>
                                    <p>Giảm 500K Đơn tối thiểu 0K</p>
                                </div>
                                <div className="voucher-progress">
                                    <div className="progress-bar" style={{ width: `${percentLeft}%` }}></div>
                                </div>
                                <div className="voucher-body">
                                    <p>Còn lại: {percentLeft.toFixed(0)}% </p>
                                    <p>Hết hạn sau: 15 giờ</p>
                                </div>
                            </div>
                            <div className="voucher-btn">
                                <button>Dùng ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Body;