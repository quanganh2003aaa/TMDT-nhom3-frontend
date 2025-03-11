import React, { useEffect, useState } from "react";
import './Brand.css'

const BrandList = () => {
    const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (page) => {
        const url = `http://localhost:8080/product/getClothes?page=${page}}`;
    
        try {
          const response = await fetch(url);
          const data = await response.json();
          setTotalPages(data.result.totalPages);
        } catch (error) {
          console.error("Lỗi khi lọc sản phẩm:", error);
        }
      };

    useEffect(() => {
        fetchProducts(currentPage);
      }, [currentPage]);

    const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        fetchProducts(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    };

    return(
        <div>
        <section className="pageProduct-header" style={{ backgroundImage: "url('../images/b5.png')" }}>
        </section>
        <section className="product section-p1">
            <h1 style={{ margin: "20px 10px" }}>Sản phẩm tìm kiếm</h1>
            <h6 style={{ color: "gray" }}>"Từ các thương hiệu nổi tiếng trên thế giới"</h6>
        </section>
        <section className="product section-p1">

        {/* Brands List */}
        <div className="container">
            <div className="brand-items">
                <div key={1} className="product-item">
                    ADIDAS
                </div>
                <div key={1} className="product-item">
                    NIKE
                </div>
                <div key={1} className="product-item">
                    PUMA
                </div>
                <div key={1} className="product-item">
                    BALENCIAGA
                </div>
            {/* {products.length > 0 ? (
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
            )} */}
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

export default BrandList;