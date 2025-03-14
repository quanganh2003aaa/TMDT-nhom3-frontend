import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {    
    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(0);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    
    const handleSearchChange = (event) => {
        setQuery(event.target.value.toLowerCase());
      };
    
    const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    };

    const handleEditUser = (idUser) => {
        navigate(`/admin/update-user/${idUser}`);
      };

    const fetchUser = () =>{
        fetch("http://localhost:8080/api/user/list", {
            method: "GET"
        })
        .then(res => res.json())
        .then(setUser);
    }

    const handleDeleteUser = (idUser) => {
        if (window.confirm(`Bạn chắc chắn muốn xóa người dùng ${idUser} không?`)) {
          fetch(`http://localhost:8080/api/user/delete/${idUser}`, {
            method: "DELETE",
            headers: {
                'Author': `Bearer ${token}`,
              },
            })
            .then(() => {
              alert('Xoá người dùng thành công!');
              fetchUser();
            })
            .catch((error) => {
              console.error('Lỗi xóa người dùng:', error);
              alert('Xóa người dùng thất bại');
            });
        }
      };

    useEffect(() => {
        // Xác thực người dùng
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

        fetchUser();
        
    }, [token]);
    
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
                    {user.map((user, index) => (
                        <tr key={index}>
                            <td style={{padding:"0"}}>{user.id}</td>
                            <td><p style={{fontSize:"20px"}}>{user.name}</p></td>
                            <td><p>{user.tel}</p></td>
                            <td><p>{user.gmail}</p></td>
                            <td><p>{user.ward}, {user.district}, {user.city}</p></td>
                            <td><p>{user.role}</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditUser(user.id)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteUser(user.id)}> 
                                    
                                <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>   
            </div>
        </main>
    );
};

export default User;