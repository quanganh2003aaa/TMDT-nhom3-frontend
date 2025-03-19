import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const CreateProduct = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const fileInputRef = useRef(null);
    
    const [product, setProduct] = useState({
        id: "",
        name: "",
        img: "",
        brand: "",
        category: "",
        size: "",
        price: "",
        status: "",
        category: "",
        brand: "",
        description: ""
    });
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct({
            ...product,
            [id]: value
        });
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
        
        formData.append("id", product.id);
        formData.append("name", product.name);
        formData.append("brand", product.brand);
        formData.append("category", product.category);
        formData.append("price", product.price);
        formData.append("status", product.status);
        formData.append("description", product.description);

        product.size.split(",").forEach(size => formData.append("size[]", size.trim()));
        
        if (imageFiles.length > 0) {
            imageFiles.forEach((file, index) => {
                console.log(`File ${index}:`, file);
                formData.append("files", file);
            });
        } else {
            console.log("Không có file nào, gửi file rỗng");
            formData.append("files", new Blob([]), "empty.png");
        }

         for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            await axios.post("http://localhost:8080/api/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            alert("Thêm sản phẩm thành công!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error.response.data);
        }
    };

    useEffect( () => {
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
    }, [])

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
    
        setProduct({
            ...product,
            [id]: value 
        });
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
                                <input type="file" id="img" accept="image/*" multiple onChange={handleImageChange} ref={fileInputRef}/>
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
                            <select className="txt-input form-control" id="status" value={product.status} onChange={handleSelectChange}>
                                <option value="">Chọn trạng thái</option>
                                <option value={0}>INACTIVE</option>
                                <option value={1}>ACTIVE</option>
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
                            <label htmlFor="category" className="col-form-label">Danh mục:</label>
                            <select className="txt-input form-control" id="category" value={product.category} onChange={handleSelectChange}>
                                <option value="">Chọn danh mục</option>
                                {category.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-8 col-sm-6">
                            <label htmlFor="brand" className="col-form-label">Thương hiệu:</label>
                            <select className="txt-input form-control" id="brand" value={product.brand} onChange={handleSelectChange}>
                                <option value="">Chọn thương hiệu</option>
                                {brand.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
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