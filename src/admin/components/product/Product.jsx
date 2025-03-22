import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product.css'

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedQuery]);

  const fetchProducts = async () => {
    let url = "http://localhost:8080/api/product/admin/getAll";

    if(query) {
      url += `?query=${debouncedQuery}`
    }
    try {
        axios 
         .get(url)
         .then((response) => {
          setProducts(response.data.result)
         })
         .catch((error) => console.log("Lỗi fetch product", error.response.data.message))
        
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
};

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
    
  };

  const handleEditProduct = (idProduct) => {
    navigate(`/admin/update-product/${idProduct}`);  
  };

  const handleDeleteProduct = (idProduct) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm ${idProduct} không?`)) {
      axios
        .delete(`http://localhost:8080/api/product/delete/${idProduct}`)
        .then(() => {
          alert('Xoá sản phẩm thành công!');
          fetchProducts();
        })
        .catch((error) => {
          console.error('Lỗi xóa sản phẩm:', error);
          alert('Xóa sản phẩm thất bại');
        });
    }
  };

  return (
    <main>
        <div className="head-title">
                <div className="left">
                    <h1>Sản Phẩm</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/orders">Sản Phẩm</a>
                        </li>
                    </ul>
                </div>
            </div>

      <a type="button" className="btn btn-ThemMoi" href="/admin/create-products">
        Thêm Mới
      </a>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Danh Sách Sản Phẩm</h3>
          </div>
          <div className="filter d-flex" style={{justifyContent:"flex-end"}}>
            <form action="#" id="idSearch" >
              <div className="form-input">
                <input type="search" placeholder="Tìm kiếm theo mã sản phẩm..." value={query} onChange={handleSearchChange} />
                <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
              </div>
            </form>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Mã Sản Phẩm</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Trạng thái</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} >
                  <td>{product.id}</td>
                  <td><img src={`/images/product/${product.img}`}  className="adminProimg"/></td> 
                  <td><p style={{fontSize:"20px"}}>{product.name}</p></td>
                  <td>
                    <p style={{ color: product.statusProduct === "ACTIVE" ? "green" : "gray", fontWeight:"600"}}>
                      {product.statusProduct}
                    </p>
                  </td>
                  <td><p>{formatPrice(product.price)}</p></td>
                  <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                    <div>
                        <button type="button" className="btn btn-success btn-product-modal" onClick={() => handleEditProduct(product.id)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteProduct(product.id)}>
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

export default ProductManagement;
