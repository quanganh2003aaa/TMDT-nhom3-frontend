import React, { useState }  from "react";
import './Product.css'

const CreateProduct = () => {
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
                    <h1>Thêm Sản Phẩm Mới</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/products">Sản Phẩm</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/create-product">Thêm Sản Phẩm</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1">
                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-id" className="col-form-label">Mã Sản Phẩm:</label>
                            <textarea className="txt-input form-control" id="product-id"></textarea>
                        </div>
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
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-name" className="col-form-label">Tên Sản Phẩm:</label>
                            <textarea className="txt-input form-control" id="product-name"></textarea>
                        </div>

                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-kho" className="col-form-label">Kho:</label>
                            <textarea className="txt-input form-control" id="product-kho"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-size" className="col-form-label">Size:</label>
                            <textarea className="txt-input form-control" id="product-size"></textarea>
                        </div>

                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-des" className="col-form-label">Mô tả:</label>
                            <textarea className="txt-input form-control" id="product-des"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-6">
                            <label htmlFor="product-price" className="col-form-label">Giá:</label>
                            <textarea className="txt-input form-control" id="product-price"></textarea>
                        </div>

                        <div className="btn-form col-8 col-sm-6">
                            <a href="/admin/products">
                            <button className="btn-huy" >
                                Hủy
                            </button></a>
                            <button className="btn-them ">
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateProduct;