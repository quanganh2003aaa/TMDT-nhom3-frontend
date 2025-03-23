import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { error } from "jquery";

const Body = () => {
    const idUser = sessionStorage.getItem("idUser")
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [order, setOrder] = useState(null);
    const [idOrder, setIdOrder] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/getById/${id}`)
            .then(response => {
                setOrder(response.data.result);
                setIdOrder(response.data.result.id);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu:", error.response.data.message);
            });
    }, [id]);

    const receiveOrder = () => {
        try{
            axios 
                .put(`http://localhost:8080/api/order/success/${idOrder}`)
            window.location.reload();
        }
        catch{
            console.log("Lỗi nút xác nhận nhận hàng", error);
        }
    }

    const cancelOrder = () => {
        try{
            axios 
                .put(`http://localhost:8080/api/order/cancel/${idOrder}`)
            window.location.reload();
        }
        catch{
            console.log("Lỗi nút hủy hàng", error);
        }
    }

    const refundShip = () => {
        const Data = {
            "idUser": idUser,
            "idOrder": idOrder
        }
        console.log(Data);
        
        try{
            axios 
                .put(`http://localhost:8080/api/refund/deliver`, Data)
                .then(() => {
                    window.location.reload();
                })
                .catch((error)=> {
                    console.log(error.response.data.code);
                })
        }
        catch{
            console.log("Lỗi nút hủy hàng", error);
        }
    }

    const refundOrder = (idOrder) => {
        navigate(`/refund/${idOrder}`)
    }

    const rateOrder = (idOrder) => {
        navigate(`/rate/${idOrder}`)
    }

    const renderActionButtons = () => {
        if (!order) return null;

        if (order.status === "Đang giao hàng") {
            return (
                <button className="btn-received" style={{backgroundColor:"#28a745", color:"white"}} onClick={receiveOrder}>
                    Đã nhận được hàng
                </button>
            );
        } else if (order.status === "Giao hàng thành công") {
            return (
                <>
                    <button className="btn-return" style={{backgroundColor:"rgb(255 134 0)", 
                        color:"white", 
                        fontSize:"20px", 
                        fontWeight:"600",
                        border:"0"}} onClick={() => refundOrder(order.id)}>
                        Hoàn trả
                    </button>
                    <button className="btn-review" style={{backgroundColor:"#008080", color:"white",
                        fontSize:"20px", 
                        fontWeight:"600",
                        border:"0"
                    }} onClick={() => rateOrder(order.id)}>
                        Đánh giá
                    </button>
                </>
            );
        } else if (order.status === "Chờ xác nhận" || order.status === "Đang chuẩn bị") {
            return (
                <button className="btn-cancel" style={{backgroundColor:"#dc3545", color:"white"}}  onClick={cancelOrder}>
                    Hủy đơn hàng
                </button>
            );
        } 
        else if (order.status === "Hoàn đơn được chấp nhận") {
            return (
                <button className="btn-cancel" style={{backgroundColor:"#dc3545", color:"white"}}  onClick={refundShip}>
                    Đã giao cho đơn vị vận chuyển
                </button>
            );
        } else {
            return (
                <></>
            );
        }
    };

    if (!order) return <h3>Đang tải...</h3>; 

    return (
        <div className="oderdetail-container">
            <div className="oderdetail-header">
                <h3 style={{ color: "white" }}>{order.status}</h3>
            </div>

            <div className="oderdetail-body">
                <div className="oderdetail-body-ship">
                    <h5>Thông tin vận chuyển</h5>
                    <div className="oderdetail-body-ship-detail">
                        <h5>{order.deliveryMethod}</h5>
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
                    <h3 style={{color: order.paymentStatus === "PAID" ? "green" : "red", marginLeft:"10px", fontWeight:"650",display:"flex", justifyContent:"flex-end"}}>
                        {order.paymentStatus === "PAID" ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
                    </h3>
                </div>

                <div className="oderdetail-actions">
                    {renderActionButtons()}
                </div>
            </div>
        </div>
    );
};

export default Body;
