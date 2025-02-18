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

    const handleEditUser = (idUser) => {
        navigate(`/admin/update-user/${idUser}`);
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
                    <h1>Người dùng</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/products">Người dùng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-user">
                Thêm Admin Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Người Dùng</h3>
                </div>
                <div className="filter d-flex justify-content-between">
                    <select className="form-select productFilterSelect" value={selectedFilter} onChange={handleFilterChange} style={{ width: '30%' }}>
                    <option value="0">Tất cả</option>
                    <option value="1">Admin</option>
                    <option value="2">Người dùng</option>
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
                        <th>Mã Người dùng</th>
                        <th>Họ Tên</th>
                        <th>Số điện thoại</th>
                        <th>Gmail</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={1}>
                            <td style={{padding:"0px 70px"}}>1</td>
                            <td><p style={{fontSize:"20px"}}>Nguyễn Tấn Hưng </p></td>
                            <td><p>0869507729</p></td>
                            <td><p>hung@gmail.com</p></td>
                            <td><p>Đống Đa, HaNoi</p></td>
                            <td><p>Admin</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditUser(1)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" style={{}}> 
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