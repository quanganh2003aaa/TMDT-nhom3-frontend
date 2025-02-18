import React, { useEffect, useState } from "react";
import './productHighlight.css'

const ProductHighlight = () => {
  const [products, setProducts] = useState([]); // State để lưu sản phẩm

  // Hàm fetch dữ liệu từ API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/product/getIndex");
      const data = await response.json();
      setProducts(data.result); // Lưu kết quả vào state
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  // Hàm xử lý chuyển trang chi tiết sản phẩm
  const detailProduct = (idProduct) => {
    const url = `/sproduct.html?id=${idProduct}`;
    window.location.href = url;
  };

  // Hàm render các ngôi sao dựa trên rating
  const renderStars = (rating) => {
    const maxStars = 5;
    let stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        stars.push(
          <i key={i} className="fa-solid fa-star" style={{ color: "#f39c12" }}></i>
        );
      } else if (i - rating <= 0.5) {
        stars.push(
          <i key={i} className="fa-regular fa-star-half-stroke" style={{ color: "#f39c12" }}></i>
        );
      } else {
        stars.push(
          <i key={i} className="fa-regular fa-star" style={{ color: "#f39c12" }}></i>
        );
      }
    }
    return stars;
  };

  // Dùng useEffect để gọi API khi component được render
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="productHighlight"> 
      <h1 className="productHighlightH1">Sản phẩm nổi bật</h1> 
      <p style={{color:"gray"}}>Các sản phẩm được tìm kiếm nhiều nhất</p>
      <div className="productContainer">
        <div className="productItems" id="product-items-1">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="productItem">
                <img src={`images/product/${product.img}`} alt={product.name} />
                <h3>{product.name}</h3>
                <div className="productStar">{renderStars(product.rate)}</div>
                <p className="productPrice">
                  {product.price.toLocaleString("vi-VN")}đ
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => detailProduct(product.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào được hiển thị.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
