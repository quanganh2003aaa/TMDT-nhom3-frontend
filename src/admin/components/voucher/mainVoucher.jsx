import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {    
    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(0);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    
    const handleSearchChange = (event) => {
        setQuery(event.target.value.toLowerCase());
      };
    
    const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    };

    const handleEditUser = (idVoucher) => {
        navigate(`/admin/update-voucher`);
      };

    // const handleDeleteUser = (idProduct) => {
    //     if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm ${idProduct} không?`)) {
    //       axios
    //         .delete(`http://localhost:8080/product/delete/${idProduct}`, {
    //           headers: {
    //             'Author': `Bearer ${token}`,
    //           },
    //         })
    //         .then(() => {
    //           alert('Xoá sản phẩm thành công!');
    //           renderListProduct();
    //         })
    //         .catch((error) => {
    //           console.error('Lỗi xóa sản phẩm:', error);
    //           alert('Xóa sản phẩm thất bại');
    //         });
    //     }
    //   };

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Mã Giảm Giá</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/voucher">Mã Giảm Giá</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-voucher">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Mã Giảm Giá</h3>
                </div>
                <div className="filter d-flex justify-content-between">
                    <select className="form-select productFilterSelect" value={selectedFilter} onChange={handleFilterChange} style={{ width: '30%' }}>
                    <option value="0">Tất cả</option>
                    <option value="1">50K</option>
                    <option value="2">100K</option>
                    </select>
                    <form action="#" id="idSearch" >
                    <div className="form-input">
                        <input type="search" placeholder="Tìm kiếm..." value={query} onChange={handleSearchChange} />
                        <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                    </div>
                    </form>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Giá Trị</th>
                        <th>Tối Thiểu</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Số lượng</th>
                        <th>Đã Dùng</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={1} >
                            <td>GiamGia20K</td>
                            <td><p>100.000 đ </p></td>
                            <td><p>500.000 đ</p></td>
                            <td><p>18/02/2025</p></td>
                            <td><p>28/02/2025</p></td>
                            <td><p>20</p></td>
                            <td><p>10</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditUser(1)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" > 
                                    {/* onClick={() => handleDeleteUser(product.id)} */}
                                <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    {/* {products.map((product) => (
                        
                    ))} */}
                    </tbody>
                </table>
                </div>   
            </div>
        </main>
    );
};

export default User;