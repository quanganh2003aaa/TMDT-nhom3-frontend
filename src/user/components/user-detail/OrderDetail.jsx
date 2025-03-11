import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Body = () => {
    const { id } = useParams(); // Lấy ID từ đường dẫn URL
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/getById/${id}`)
            .then(response => {
                setOrder(response.data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h3>Đang tải...</h3>;
    if (error) return <h3>Lỗi khi tải dữ liệu!</h3>;

    return (
        <div className="oderdetail-container">
            <div className="oderdetail-header">
                <h3 style={{ color: "white" }}>Đang giao hàng</h3>
            </div>

            <div className="oderdetail-body">
                <div className="oderdetail-body-ship">
                    <h5>Thông tin vận chuyển</h5>
                    <div className="oderdetail-body-ship-detail">
                        <h5>{order.deliveryMethod}</h5>
                        <h5 style={{ color: "GrayText", marginLeft: "10px" }}>Thời gian dự kiến: 2 ngày</h5>
                    </div>
                </div>

                <div className="oderdetail-body-address">
                    <h5>Địa chỉ nhận hàng</h5>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <i className="bx bx-map"></i>
                        <div style={{ marginLeft: "10px" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5>{order.nameUser}</h5>
                                <h5 style={{ color: "GrayText", marginLeft: "10px" }}>{order.tel}</h5>
                            </div>
                            <h5>{order.address}</h5>
                        </div>
                    </div>
                </div>

                <div className="oderdetail-body-product">
                    {order.detailOrderDTOList.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img 
                                src={`/images/product/${item.imgProduct}`} 
                                alt={item.nameProduct} 
                                style={{ width: "25%", height: "25%", marginRight: "30px" }} 
                            />
                            <div style={{width:"100%"}}>
                                <h5 style={{fontSize:"40px"}}>{item.nameProduct}</h5>
                                <p>Size: {item.size} | x{item.quantity}</p>
                                <h5 style={{placeSelf: "end right" }}>{item.price.toLocaleString()}đ</h5>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="oderdetail-summary">
                    <div style={{display:"flex", justifyContent:"space-between", margin:"0 20px"}}>
                        <p style={{color:"black"}}><strong>Tổng tiền hàng:</strong> </p>
                        <p style={{color:"black"}}>{order.totalPrice.toLocaleString()}đ</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", margin:"0 20px"}}>
                        <p style={{color:"black"}}><strong>Phí giao hàng:</strong> </p>     
                        <p style={{color:"black"}}>{order.shippingFee.toLocaleString()}đ</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", margin:"0 20px"}}>
                        <p style={{color:"black"}}><strong>Giảm giá:</strong> </p>
                        <p style={{color:"black"}}>{order.discountAmount.toLocaleString()}đ</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"flex-end", margin:"20px 20px"}}>
                        <h3 style={{color:"black", marginRight:"20px"}}><strong>Thành tiền:</strong> </h3>
                        <h3 style={{color:"black"}}>{order.finalAmount.toLocaleString()}đ</h3>
                    </div>
                </div>

                <div className="oderdetail-actions">
                    <button className="btn-cancel">Hoàn trả</button>
                    <button className="btn-review" style={{backgroundColor:"#008080", color:"white"}}>Đánh giá</button>
                    <button className="btn-delete">Hủy đơn hàng</button>
                </div>
            </div>
        </div>
    );
};

export default Body;
