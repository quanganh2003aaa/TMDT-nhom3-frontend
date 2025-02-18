import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'
import EditProductModal from './EditProduct.js'

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const token = sessionStorage.getItem('token');

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

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('id', document.getElementById('product-id').value);
    formData.append('name', document.getElementById('product-name').value);
    formData.append('size', document.getElementById('product-size').value);
    formData.append('price', Number(document.getElementById('product-price').value));
    formData.append('quantity', Number(document.getElementById('product-quantity').value));
    formData.append('description', document.getElementById('product-description').value);
    formData.append('category', Number(document.getElementById('product-category').value));
    formData.append('file', document.getElementById('product-image').files[0]);

    axios
      .post('http://localhost:8080/product/create', formData, {
        headers: {
          'Author': `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Thêm sản phẩm thành công!');
        renderListProduct();
      })
      .catch((error) => {
        console.error('Lỗi thêm sản phẩm:', error);
        alert('Thêm sản phẩm thất bại');
      });
  };

  const handleEditProduct = (idProduct) => {
    if (selectedProductId === idProduct && selectedProduct) return;
    setSelectedProductId(idProduct);
    axios
      .get(`http://localhost:8080/product/detail/${idProduct}`)
      .then((response) => {
        setSelectedProduct(response.data.result);

        setTimeout(() => {
            const modalElement = document.getElementById('editModal');
            if (modalElement) {
              const editModal = new window.bootstrap.Modal(modalElement);
              editModal.show();
            }else {
                console.error("Không tìm thấy modal 'editModal' trong DOM.");
              }
          }, 200);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      });
  };

  const handleSaveProduct = (formDataToSend) => {
        axios
            .put(`http://localhost:8080/product/update/${selectedProductId}`, formDataToSend, {
                data: formDataToSend,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Author": `Bearer ${token}`
                },
            })
            .then(() => {
                alert("Cập nhật sản phẩm thành công!");
                renderListProduct(); // Load lại danh sách sản phẩm
                setSelectedProduct(null); // Reset selected product
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật sản phẩm:", error);
                alert("Cập nhật sản phẩm thất bại.");
            });
    };

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

      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#addModal" style={{ float: 'right', margin: '10px 20px' }}>
        Thêm Mới
      </button>

      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: '900px', marginLeft: '-180px' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Mới Sản Phẩm</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-8 col-sm-6">
                    <label htmlFor="product-id" className="col-form-label">Mã Sản Phẩm:</label>
                    <textarea className="form-control" id="product-id"></textarea>
                  </div>
                  
                  <div className="col-8 col-sm-6">
                    <label htmlFor="product-image" className="col-form-label">Ảnh:</label>
                    <div>
                        <input type="file" id="product-image" name="image" accept="image/*" />
                    </div>
                  </div>
                </div>

                <div className="row">
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-name" className="col-form-label">Tên Sản Phẩm:</label>
                        <textarea className="form-control" id="product-name"></textarea>
                    </div>
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-category" className="col-form-label">Loại sản phẩm: </label>
                        <select className="form-control" id="product-category">
                            <option value="1">Giày</option>
                            <option value="2">Quần áo</option>
                            <option value="3">Phụ kiện</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-size" className="col-form-label">Size:</label>
                        <textarea className="form-control" id="product-size"></textarea>
                    </div>
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-quantity" className="col-form-label">Kho:</label>
                        <textarea className="form-control" id="product-quantity"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-price" className="col-form-label">Giá:</label>
                        <textarea className="form-control" id="product-price"></textarea>
                    </div>
                    <div className="col-8 col-sm-6">
                        <label htmlFor="product-description" className="col-form-label">Mô Tả:</label>
                        <textarea className="form-control" id="product-description"></textarea>
                    </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Không</button>
              <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Có</button>
            </div>
          </div>
        </div>
      </div>

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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td><img src={`../images/product/${product.img}`} alt={product.name} className="adminProimg"/></td>
                  <td><p style={{fontSize:"20px"}}>{product.name}</p></td>
                  <td><p>{product.quantity}</p></td>
                  <td><p>{formatPrice(product.price)}</p></td>
                  <td style={{display:"flex", paddingTop:"35px"}} >
                    <div>
                        <button type="button" className="btn btn-success btn-product-modal" onClick={() => handleEditProduct(product.id)} data-bs-toggle="modal" data-bs-target="#editModal">
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <EditProductModal
                            idProduct={selectedProductId}
                            onSave={handleSaveProduct}
                            onClose={() => setSelectedProduct(null)}
                            />
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
