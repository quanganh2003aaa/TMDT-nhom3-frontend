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
        starsHtml.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (i - rating <= 0.5) {
        starsHtml.push(<i key={i} className="fa-regular fa-star-half-stroke"></i>);
      } else {
        starsHtml.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
    return starsHtml;
  };

  // PRODUCT STATES
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // FILTER STATES
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterSort, setFilterSort] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // DATA FOR FILTER OPTIONS
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const query = new URLSearchParams(window.location.search).get("query") || "";

  // FETCH PRODUCT LIST
  const fetchProducts = async (page, priceFilter, sortFilter, query, brandId, categoryId) => {
    const url = new URL("http://localhost:8080/api/product/getProduct");

    url.searchParams.append("page", page);
    url.searchParams.append("filterPrice", priceFilter);
    url.searchParams.append("filterSort", sortFilter);
    url.searchParams.append("query", query);
    url.searchParams.append("brand", brandId);
    url.searchParams.append("category", categoryId);

    console.log("Calling API:", url.toString());

    try {
      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.result.objectList);
      setTotalPages(data.result.totalPages);
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm:", error);
    }
  };

  // FETCH BRAND & CATEGORY DATA
  const fetchBrands = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/brand/getAll");
      const data = await res.json();
      setBrands(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/category/getAll");
      const data = await res.json();
      setCategories(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
    }
  };

  // FILTER HANDLERS
  const handleFilterChange = (e) => {
    const priceFilter = e.target.value;
    setFilterPrice(priceFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const sortFilter = e.target.value;
    setFilterSort(sortFilter);
    setCurrentPage(1);
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // INITIAL FETCH
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, filterPrice, filterSort, query, selectedBrand, selectedCategory);
  }, [currentPage, filterPrice, filterSort, query, selectedBrand, selectedCategory]);

  return (
    <div>
      <section className="pageProduct-header" style={{ backgroundImage: "url('../images/b5.png')" }}></section>

      <section className="product section-p1">
        <h1 style={{ margin: "20px 10px" }}>Sản phẩm tìm kiếm</h1>
        <h6 style={{ color: "gray" }}>"Từ các thương hiệu nổi tiếng trên thế giới"</h6>
      </section>

      <section className="product section-p1">
        <div className="product-layout-container" style={{ display: 'flex', gap: '20px' }}>

          {/* FILTER SIDEBAR */}
          <div className="filter-sidebar" style={{ flex: '0 0 20%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h4>Lọc sản phẩm</h4>

            <div className="form-floating mb-3">
              <label style={{ marginBottom: '5px' }}>Lọc theo giá</label>
              <select className="form-select filterPrice" onChange={handleFilterChange} value={filterPrice} style={{ backgroundColor: "#f1f1f1" }}>
                <option value="0">Tất cả</option>
                <option value="1">0 - 5.000.000đ</option>
                <option value="2">5.000.000đ - 10.000.000đ</option>
                <option value="3">10.000.000đ - 20.000.000đ</option>
                <option value="4">&gt; 20.000.000đ</option>
              </select>
            </div>

            <div className="form-floating mb-3">
              <label style={{ marginBottom: '5px' }}>Sắp xếp</label>
              <select className="form-select filterSort" onChange={handleSortChange} value={filterSort} style={{ backgroundColor: "#f1f1f1" }}>
                <option value="0">Sản phẩm phổ biến</option>
                <option value="1">Giá: thấp đến cao</option>
                <option value="2">Giá: cao đến thấp</option>
              </select>
            </div>

            <div className="form-floating mb-3">
              <label style={{ marginBottom: '5px' }}>Thương hiệu</label>
              <select className="form-select filterBrand" onChange={handleBrandChange} value={selectedBrand} style={{ backgroundColor: "#f1f1f1" }}>
                <option value="">Tất cả thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="form-floating mb-3">
              <label style={{ marginBottom: '5px' }}>Danh mục</label>
              <select className="form-select filterCategory" onChange={handleCategoryChange} value={selectedCategory} style={{ backgroundColor: "#f1f1f1" }}>
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="product-content" style={{ flex: '1' }}>
            <div className="container">
              <div className="product-items" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="product-item" style={{
                      flex: '0 0 30%',
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '8px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                      textAlign: 'center'
                    }}>
                      <img src={`images/product/${product.img}`} alt={product.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                      <p className="product-name" style={{ fontWeight: '600' }}>{product.name}</p>
                      <div className="product-stars">{renderStars(product.rate)}</div>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <div className="product-actions">
                        <button className="btn btn-primary btn-detail-product" onClick={() => (window.location.href = `/sproduct?id=${product.id}`)}>Xem chi tiết</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không tìm thấy sản phẩm nào.</p>
                )}
              </div>

              {/* PAGINATION */}
              <nav aria-label="Page navigation example" className="pagination-container" style={{ marginTop: '20px' }}>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">&laquo;</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">&raquo;</button>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
