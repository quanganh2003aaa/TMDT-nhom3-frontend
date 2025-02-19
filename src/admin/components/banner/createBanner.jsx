import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [images, setImages] = useState([]);
    
    const handleImageChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
        setImages(fileArray);  // Cập nhật các hình ảnh vào state
    };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Tạo Banner Quảng Cáo</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/banner">Banner Quảng Cáo</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-banner">Tạo Banner Quảng Cáo</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-image" className="col-form-label">Ảnh:</label>
                            <div>
                                <input type="file" id="product-image" name="image" accept="image/*" multiple onChange={handleImageChange}  />
                            </div>
                            <div className="image-preview mt-3">
                                {images.length > 0 && images.map((image, index) => (
                                    <img key={index} src={image} alt={`product-image-${index}`} className="img-thumbnail" width="100" />
                                ))}
                            </div>
                        </div>

                        <div className="btn-form" style={{paddingTop:"40px"}}>
                            <a href="/admin/banner">
                                <button  className="btn-huy">Hủy</button>
                            </a>
                            <button className="btn-them">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;