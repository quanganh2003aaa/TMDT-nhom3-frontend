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
    fetchProducts();
  }, [query, selectedFilter]);

  const fetchProducts = async () => {
    try {
        // Bước 1: Lấy danh sách ID sản phẩm
        const response = await axios.get('http://localhost:8080/api/product/admin/getAll');
        const productIds = response.data.result.map(product => product.id);

        // Bước 2: Dùng Promise.all để gọi API chi tiết từng sản phẩm
        const productDetails = await Promise.all(
            productIds.map(async (id) => {
                try {
                    const productResponse = await axios.get(`http://localhost:8080/api/product/id/${id}`);
                    const product = productResponse.data.result;

                    // Lọc ảnh có indexImg === 0
                    const filteredImage = product.img.find(image => image.indexImg === 0)?.img || '';

                    return {
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        category: product.category,
                        price: product.price,
                        quantity: product.quantity,
                        img: filteredImage
                    };
                } catch (error) {
                    console.error(`Lỗi khi lấy sản phẩm ID ${id}:`, error);
                    return null;
                }
            })
        );

        // Lọc bỏ sản phẩm null (lỗi khi fetch)
        setProducts(productDetails.filter(product => product !== null));
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
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
    navigate(`/admin/update-product/${idProduct}`);  
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
        .delete(`http://localhost:8080/api/product/delete/${idProduct}`, {
          // headers: {
          //   'Author': `Bearer ${token}`,
          // },
        })
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
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th>Kho</th>
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
                  <td><p>{product.brand}</p></td>
                  <td><p>{product.category}</p></td>
                  <td><p>{product.quantity}</p></td>
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
