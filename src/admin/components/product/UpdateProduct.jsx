import React, { useState, useEffect, useRef } from "react";
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
        status: "",
        description: ""
    });
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);

    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const fileInputRef = useRef(null);

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
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/id/${idProduct}`);

                const data = response.data.result;
                const imageURLs = data.img.map(item => `/images/product/${item.img}`);

                setProduct({
                    id: data.id,
                    name: data.name,
                    img: imageURLs,
                    brand: data.brand,
                    category: data.category,
                    size: data.sizeList.join(", "),
                    price: data.price,
                    status: data.status,
                    description: data.description
                });

                setImages(imageURLs);

                const files = await Promise.all(
                    data.img.map(async (item) => {
                        const url = `/images/${item.img}`;
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const filename = item.img.split('/').pop(); 
                        return new File([blob], filename, { type: blob.type });
                    })
                );
                setImageFiles(files);

            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        };

        const fetchBrand = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/api/brand/getAll`);

                const data = response.data.result;
                setBrand(data);
            } catch (error) {
                console.error("Lỗi khi lấy brand:", error);
            }
        };

        const fetchCate = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/api/category/getAll`);

                const data = response.data.result;
                setCategory(data);
            } catch (error) {
                console.error("Lỗi khi lấy category:", error);
            }
        };

        fetchCate();
        fetchBrand();
        fetchProduct();
    }, [idProduct, token]);

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct({
            ...product,
            [id]: value
        });
    };

    const handleSelectChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            status: e.target.value
        }));
    };

    const handleBrandChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            brand:parseInt(e.target.value)
        }));
    };
    
    
    const handleCategoryChange = (e) => {
        const selectedCategory = category.find(c => c.id == e.target.value);
        setProduct((prev) => ({
            ...prev,
            category: parseInt(selectedCategory.id)
        }));
    };
    
    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageURLs = files.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...imageURLs]);
        setImageFiles(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };    
    
    const handleSubmit = async () => {
        const formData = new FormData();
        const brandId = typeof product.brand === "object" ? product.brand.id : product.brand;
        const categoryId = typeof product.category === "object" ? product.category.id : product.category;
        
        // Thêm thông tin sản phẩm vào formData
        formData.append("name", product.name);
        formData.append("brand", brandId);
        formData.append("category", categoryId);
        formData.append("price", product.price);
        formData.append("status", product.status === "INACTIVE" ? 0 : 1);
        formData.append("description", product.description);
        
        if (product.size) {
            product.size.split(",").forEach((s) => formData.append("size", s.trim()));
        }
    
        if (imageFiles.length > 0) {
            imageFiles.forEach((file, index) => {
                formData.append("files", file);
            });
        } else {
            console.log("Không có file nào, gửi file rỗng");
            formData.append("files", new Blob([]), "empty.png");
        }

        try {
            await axios.put(`http://localhost:8080/api/product/update/${idProduct}`, formData, {
                headers: {
                    Author: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            alert("Cập nhật sản phẩm thành công!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error.response?.data || error.message);
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
                                <input
                                    type="file"
                                    id="img"
                                    name="image"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className="image-preview mt-3">
                                {images.map((image, index) => (
                                    <div key={index} className="image-preview-item">
                                        <img src={image} alt={`product-${index}`} className="img-thumbnail" width="100" />
                                        <button type="button" onClick={() => removeImage(index)}>X</button>
                                    </div>
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
                            <label htmlFor="status" className="col-form-label">Trạng thái sản phẩm:</label>
                            <select
                                className="txt-input form-control"
                                id="status"
                                value={product.status}
                                onChange={handleSelectChange}
                            >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="brand" className="col-form-label">Thương Hiệu:</label>
                            <select
                                className="txt-input form-control"
                                id="brand"
                                value={product.brand?.id || product.brand} 
                                onChange={handleBrandChange}
                            >
                                {brand.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-8 col-sm-6">
                            <label htmlFor="category" className="col-form-label">Danh Mục:</label>
                            <select 
                                className="txt-input form-control" 
                                id="category" 
                                value={product.category?.id || product.category} 
                                onChange={handleCategoryChange}
                            >
                                {category.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
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
