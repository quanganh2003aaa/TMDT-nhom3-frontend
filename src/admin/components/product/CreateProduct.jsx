import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const CreateProduct = () => {
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
        category: "",
        brand: "",
        description: ""
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct({
            ...product,
            [id]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));

        setImages([...images, ...newImages]);
        setProduct({
            ...product,
            img: [...images, ...newImages].join(", ")
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        
        // Append text fields
        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });

        // Append size as an array
        product.size.split(",").forEach(size => formData.append("size[]", size.trim()));
        
        // Append images
        images.forEach((file) => {
            formData.append("images", file);
        });

        try {
            await axios.post("http://localhost:8080/api/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Thêm sản phẩm thành công!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Thêm Sản Phẩm Mới</h1>
                    <ul className="breadcrumb">
                        <li><a href="/admin/admin">Trang Chủ</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a href="/admin/products">Sản Phẩm</a></li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li><a className="active">Thêm Sản Phẩm</a></li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="id" className="col-form-label">Mã Sản Phẩm:</label>
                            <textarea className="txt-input form-control" id="id" value={product.id} onChange={handleChange}></textarea>
                        </div>
                        <div className="col-8 col-sm-6">
                            <label htmlFor="img" className="col-form-label">Ảnh:</label>
                            <div>
                                <input type="file" id="img" accept="image/*" multiple onChange={handleImageChange} />
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
                            <label htmlFor="category" className="col-form-label">Danh mục:</label>
                            <textarea className="txt-input form-control" id="category" value={product.category} onChange={handleChange}></textarea>
                        </div>
                        <div className="col-8 col-sm-6">
                            <label htmlFor="brand" className="col-form-label">Thương hiệu:</label>
                            <textarea className="txt-input form-control" id="brand" value={product.brand} onChange={handleChange}></textarea>
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
                            <button className="btn-them" onClick={handleSubmit}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateProduct;