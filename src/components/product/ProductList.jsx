import React, { useEffect, useState } from "react";
import './Product.css'

const ProductList = () => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  const renderStars = (rating) => {
    const maxStars = 5;
    let starsHtml = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        starsHtml.push(
          <i
            key={i}
            className="fa-solid fa-star"            
          ></i>
        );
      } else if (i - rating <= 0.5) {
        starsHtml.push(
          <i
            key={i}
            className="fa-regular fa-star-half-stroke"
          ></i>
        );
      } else {
        starsHtml.push(
          <i
            key={i}
            className="fa-regular fa-star"
          ></i>
        );
      }
    }
    return starsHtml;
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterSort, setFilterSort] = useState(0);
  const query = new URLSearchParams(window.location.search).get("query") || "";

  // Fetch products and pagination data
  const fetchProducts = async (page, priceFilter, sortFilter, query) => {
    const url = `http://localhost:8080/product/getProduct?page=${page}&filterSort=${sortFilter}&filterPrice=${priceFilter}&query=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.result.objectList);
      setTotalPages(data.result.totalPages);
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm:", error);
    }
  };

  // Handle filter and sort changes
  const handleFilterChange = (e) => {
    const priceFilter = e.target.value;
    setFilterPrice(priceFilter);
    fetchProducts(1, priceFilter, filterSort, query);
  };

  const handleSortChange = (e) => {
    const sortFilter = e.target.value;
    setFilterSort(sortFilter);
    fetchProducts(1, filterPrice, sortFilter, query);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchProducts(page, filterPrice, filterSort, query);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, filterPrice, filterSort, query);
  }, [currentPage, filterPrice, filterSort, query]);

  return (
    <div>
      <section className="pageProduct-header" style={{ backgroundImage: "url('../images/b5.png')" }}>
      </section>
      <section className="product section-p1">
        <h1 style={{ margin: "20px 10px" }}>Sản phẩm tìm kiếm</h1>
        <h6 style={{ color: "gray" }}>"Từ các thương hiệu nổi tiếng trên thế giới"</h6>
      </section>
    <section className="product section-p1">
      {/* Filter and Sort */}
      <div className="filter-section-horizontal-right row" >
        <div className="col-md" >
          <div className="form-floating">
            <label >Lọc theo giá</label>
            <select
              className="form-select filterPrice"
              onChange={handleFilterChange}
              value={filterPrice}
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <option value="0">Tất cả</option>
              <option value="1">0 - 5.000.000đ</option>
              <option value="2">5.000.000đ - 10.000.000đ</option>
              <option value="3">10.000.000đ - 20.000.000đ</option>
              <option value="4">&gt; 20.000.000đ</option>
            </select>
          </div>
        </div>

        <div className="col-md" >
          <div className="form-floating">
            <label >Sắp xếp</label>
            <select
              className="form-select filterSort"
              onChange={handleSortChange}
              value={filterSort}
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <option value="0">Sản phẩm phổ biến</option>
              <option value="1">Theo thứ tự giá: thấp đến cao</option>
              <option value="2">Theo thứ tự giá: cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="container">
        <div className="product-items">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={`images/product/${product.img}`} alt={product.name} />
                <p className="product-name">{product.name}</p>
                <div className="product-stars" style={{}}>{renderStars(product.rate)}</div>
                <p className="product-price">{formatPrice(product.price)}</p>
                <div className="product-actions">
                  <button
                    className="btn btn-primary btn-detail-product"
                    onClick={() => (window.location.href = `/sproduct?id=${product.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Không tìm thấy sản phẩm nào.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example" className="pagination-container">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              &laquo;
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </section>
    </div>
  );
};

export default ProductList;
