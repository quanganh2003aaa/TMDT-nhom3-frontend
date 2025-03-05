import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const UpdateProduct = () => {
    const { idProduct } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const [product, setProduct] = useState({
        id: "",
        name: "",
        img: "",
        brand: "",
        category: "",
        size: "",
        price: "",
        quantity: "",
        description: ""
    });

    const [images, setImages] = useState([]);

    // 🟢 Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/getById/${idProduct}`, {
                    // headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data.result;
                setProduct({
                    id: data.id,
                    name: data.name,
                    img: data.img,
                    brand: data.brand,
                    category: data.category,
                    size: data.size.join(", "), // Chuyển mảng size thành chuỗi
                    price: data.price,
                    quantity: data.quantity,
                    description: data.description
                });

                // Lưu ảnh để hiển thị trước
                setImages(data.img.split(","));
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        };

        fetchProduct();
    }, [idProduct, token]);

    // 🟢 Cập nhật state khi nhập liệu
    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct({
            ...product,
            [id]: value
        });
    };

    // 🟢 Xử lý chọn ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));

        setImages([...images, ...newImages]);

        // Lưu đường dẫn ảnh dưới dạng chuỗi (chưa có upload ảnh thực tế)
        setProduct({
            ...product,
            img: [...images, ...newImages].join(", ")
        });
    };

    // 🟢 Gửi dữ liệu cập nhật
    const handleSubmit = async () => {
        const updatedData = {
            ...product,
            size: product.size.split(",").map((s) => s.trim()), // Chuyển chuỗi size thành mảng
            img: product.img.trim() // Đảm bảo img là chuỗi
        };

        try {
            await axios.put(`http://localhost:8080/api/product/update/${idProduct}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật sản phẩm thành công!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        }
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Sửa Sản Phẩm</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin/admin">Trang Chủ</a></li>
                        <li><i className="bx bx-chevron-right"></i></li>
                        <li><a href="/admin/products">Sản Phẩm</a></li>
                        <li><i className="bx bx-chevron-right"></i></li>
                        <li><a className="active">Sửa Sản Phẩm</a></li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="id" className="col-form-label">Mã Sản Phẩm:</label>
                            <textarea className="txt-input form-control" id="id" value={product.id} onChange={handleChange} disabled />
                        </div>
                        <div className="col-8 col-sm-6">
                            <label htmlFor="img" className="col-form-label">Ảnh:</label>
                            <div>
                                <input type="file" id="img" name="image" accept="image/*" multiple onChange={handleImageChange} />
                            </div>
                            <div className="image-preview mt-3">
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt={`product-image-${index}`} className="img-thumbnail" width="100" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="name" className="col-form-label">Tên Sản Phẩm:</label>
                            <textarea className="txt-input form-control" id="name" value={product.name} onChange={handleChange}></textarea>
                        </div>

                        <div className="col-8 col-sm-6">
                            <label htmlFor="quantity" className="col-form-label">Kho:</label>
                            <textarea className="txt-input form-control" id="quantity" value={product.quantity} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="size" className="col-form-label">Size (cách nhau bằng dấu phẩy):</label>
                            <textarea className="txt-input form-control" id="size" value={product.size} onChange={handleChange}></textarea>
                        </div>

                        <div className="col-8 col-sm-6">
                            <label htmlFor="description" className="col-form-label">Mô tả:</label>
                            <textarea className="txt-input form-control" id="description" value={product.description} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="price" className="col-form-label">Giá:</label>
                            <textarea className="txt-input form-control" id="price" value={product.price} onChange={handleChange}></textarea>
                        </div>

                        <div className="btn-form col-8 col-sm-6">
                            <a href="/admin/products">
                                <button className="btn-huy">Hủy</button>
                            </a>
                            <button className="btn-them" onClick={handleSubmit}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UpdateProduct;
