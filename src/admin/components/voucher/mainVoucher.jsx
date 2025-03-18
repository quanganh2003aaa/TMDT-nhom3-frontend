import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {    
    const [voucher, setVoucher] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(0);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    };

    useEffect(() => {
        renderListVoucher();
    }, [query, selectedFilter]);

    const renderListVoucher = () => {
    const url = `http://localhost:8080/api/voucher/getAll?query=${encodeURIComponent(query)}&select=${selectedFilter}`;
    axios
        .get(url  //, {
        // headers: {
        //     'Author': `Bearer ${token}`,
        // },
        // }
        )
        .then((response) => {
        setVoucher(response.data.result);
        })
        .catch((error) => {
        console.error('Error fetching products:', error);
        });
    };
    
    const handleSearchChange = (event) => {
        setQuery(event.target.value.toLowerCase());
      };
    
    const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    };

    const handleEditUser = (idVoucher) => {
        navigate(`/admin/update-voucher/${idVoucher}`);
    };    

    const handleDeleteUser = (idVoucher) => {
        if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm ${idVoucher} không?`)) {
          axios
            .delete(`http://localhost:8080/api/voucher/delete/${idVoucher}`, {
            //   headers: {
            //     'Author': `Bearer ${token}`,
            //   },
            })
            .then(() => {
              alert('Xoá sản phẩm thành công!');
              renderListVoucher();
            })
            .catch((error) => {
              console.error('Lỗi xóa sản phẩm:', error);
              alert('Xóa sản phẩm thất bại');
            });
        }
      };

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
                <div className="filter d-flex" style={{justifyContent:"flex-end"}}>
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
                    {voucher.map((voucher) => (
                        <tr key={voucher.id} >
                            <td>{voucher.id}</td>
                            <td><p>{formatPrice(voucher.discountValue)}</p></td>
                            <td><p>{formatPrice(voucher.minOrderAmount)}</p></td>
                            <td><p>{voucher.startDate}</p></td>
                            <td><p>{voucher.endDate}</p></td>
                            <td><p>{voucher.maxUsage}</p></td>
                            <td><p>{voucher.usedCount}</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditUser(voucher.id)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteUser(voucher.id)}>                                     
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