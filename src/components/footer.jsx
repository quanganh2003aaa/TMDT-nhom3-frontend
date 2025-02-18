import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <section className="footer bg-light text-dark py-4">
            <div className="container">
                <div className="row">
                    {/* Logo và giới thiệu */}
                    <div className="col-md-5">
                        <div className="img-inner dark">
                            <img
                                width="300"
                                height="90"
                                src="images/logo_s.png"
                                className="attachment-original size-original"
                                alt=""
                                decoding="async"
                                loading="lazy"
                            />
                        </div>
                        <p className="fz15 mt-3 mb-0 text-dark">
                            Sneaker Studio - Nhà sưu tầm và phân phối chính hãng các thương hiệu thời trang quốc tế hàng đầu Việt Nam
                        </p>
                        <div className="info mt-4">
                            <h4 style={{ color: "black" }}>Hệ Thống Cửa Hàng</h4>
                            <ul className="list-add-footer mb-0 list-unstyled fz16 fw-400 mt-3">
                                <li className="d-flex mb-2">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span className="ms-3">Cơ sở: P. Văn Quán, Hà Đông, Hà Nội, Việt Nam</span>
                                </li>
                                <li className="d-flex mb-2">
                                    <i className="fa-solid fa-phone"></i>
                                    <span className="ms-3">Hotline: 088 xxxxx55</span>
                                </li>
                                <li className="d-flex mb-2">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span className="ms-3">Service@SneakerStudio.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Về chúng tôi */}
                    <div className="col-md-3">
                        <h4 style={{ color: "black" }}>Về chúng tôi</h4>
                        <ul className="list menu">
                            <li className="li_menu mb-3"><a href="#">Giới thiệu</a></li>
                            <li className="li_menu mb-3"><a href="#">Tuyển Dụng</a></li>
                            <li className="li_menu mb-3"><a href="#">Dịch Vụ Spa, Sửa Giày</a></li>
                            <li className="li_menu mb-3"><a href="#">Tin Tức, Sự Kiện</a></li>
                        </ul>
                        <h5 className="mt-4" style={{ color: "black" }}>Kết nối với chúng tôi</h5>
                        <div className="social_icon d-flex">
                            <span className="box50 border border-light me-2"><a href="#"><i className="fa-brands fa-facebook"></i></a></span>
                            <span className="box50 border border-light me-2"><a href="#"><i className="fa-brands fa-instagram"></i></a></span>
                            <span className="box50 border border-light me-2"><a href="#"><i className="fa-brands fa-tiktok"></i></a></span>
                            <span className="box50 border border-light"><a href="#"><i className="fa-brands fa-youtube"></i></a></span>
                        </div>
                    </div>

                    {/* Hướng dẫn */}
                    <div className="col-md-3">
                        <h4 style={{ color: "black" }}>Về chúng tôi</h4>
                        <ul className="list menu">
                            <li className="li_menu mb-3"><a href="#">Hướng dẫn mua hàng</a></li>
                            <li className="li_menu mb-3"><a href="#">Chính sách đổi trả và bảo hành</a></li>
                            <li className="li_menu mb-3"><a href="#">Chính Sách Thanh Toán</a></li>
                            <li className="li_menu mb-3"><a href="#">Điều khoản trang web</a></li>
                            <li className="li_menu mb-3"><a href="#">Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</a></li>
                            <li className="li_menu mb-3"><a href="#">Vận chuyển và giao hàng</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Bản quyền */}
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        © Bản quyền thuộc về Sneaker Studio
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
