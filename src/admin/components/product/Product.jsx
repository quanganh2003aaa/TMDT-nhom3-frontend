import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product.css'

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  useEffect(() => {
    renderListProduct();
  }, [query, selectedFilter]);

  const renderListProduct = () => {
    const url = `http://localhost:8080/product/admin/getAll?query=${encodeURIComponent(query)}&select=${selectedFilter}`;
    axios
      .get(url, {
        headers: {
          'Author': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.result);
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

  // const handleAddProduct = () => {
  //   const formData = new FormData();
  //   formData.append('id', document.getElementById('product-id').value);
  //   formData.append('name', document.getElementById('product-name').value);
  //   formData.append('size', document.getElementById('product-size').value);
  //   formData.append('price', Number(document.getElementById('product-price').value));
  //   formData.append('quantity', Number(document.getElementById('product-quantity').value));
  //   formData.append('description', document.getElementById('product-description').value);
  //   formData.append('category', Number(document.getElementById('product-category').value));
  //   formData.append('file', document.getElementById('product-image').files[0]);

  //   axios
  //     .post('http://localhost:8080/product/create', formData, {
  //       headers: {
  //         'Author': `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       alert('Thêm sản phẩm thành công!');
  //       renderListProduct();
  //     })
  //     .catch((error) => {
  //       console.error('Lỗi thêm sản phẩm:', error);
  //       alert('Thêm sản phẩm thất bại');
  //     });
  // };

  const handleEditProduct = (idProduct) => {
    navigate(`/admin/update-product`);  ///${idProduct}
  };

  // const handleSaveProduct = (formDataToSend) => {
  //       axios
  //           .put(`http://localhost:8080/product/update/${selectedProductId}`, formDataToSend, {
  //               data: formDataToSend,
  //               headers: {
  //                   "Content-Type": "multipart/form-data",
  //                   "Author": `Bearer ${token}`
  //               },
  //           })
  //           .then(() => {
  //               alert("Cập nhật sản phẩm thành công!");
  //               renderListProduct(); // Load lại danh sách sản phẩm
  //               setSelectedProduct(null); // Reset selected product
  //           })
  //           .catch((error) => {
  //               console.error("Lỗi khi cập nhật sản phẩm:", error);
  //               alert("Cập nhật sản phẩm thất bại.");
  //           });
  //   };

  const handleDeleteProduct = (idProduct) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm ${idProduct} không?`)) {
      axios
        .delete(`http://localhost:8080/product/delete/${idProduct}`, {
          headers: {
            'Author': `Bearer ${token}`,
          },
        })
        .then(() => {
          alert('Xoá sản phẩm thành công!');
          renderListProduct();
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
          <div className="filter d-flex justify-content-between">
            <select className="form-select productFilterSelect" value={selectedFilter} onChange={handleFilterChange} style={{ width: '30%' }}>
              <option value="0">Tất cả sản phẩm</option>
              <option value="1">Giày</option>
              <option value="2">Quần Áo</option>
              <option value="3">Phụ Kiện</option>
              <option value="4">Sản phẩm số lượng thấp</option>
              <option value="5">Giá từ thấp đến cao</option>
              <option value="6">Giá từ cao đến thấp</option>
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
                <th>Mã Sản Phẩm</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Kho</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* {products.map((product) => ( */}
                <tr key={1} >
                  <td style={{padding:"0px 30px"}}>1</td>
                  <td><img src={`/images/ao_2.png`}  className="adminProimg"/></td> {/* alt={product.name} */}
                  <td><p style={{fontSize:"20px"}}>Giày Nike</p></td>
                  <td><p>12</p></td>
                  <td><p>{formatPrice(1000000)}</p></td>
                  <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                    <div>
                        <button type="button" className="btn btn-success btn-product-modal" onClick={() => handleEditProduct(1)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteProduct(1)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
        
      </div>
    </main>
  );
};

export default ProductManagement;
