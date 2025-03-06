import React, { useState, useEffect } from "react";
import './ProductDetail.css'

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const productId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
    fetchRatings();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/detail/${productId}`);
      const data = await response.json();
      console.log(data);
      setProduct(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/product/getIndex");
      const data = await response.json();
      setRelatedProducts(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm liên quan:", error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/rate/getByProduct/${productId}`);
      const data = await response.json();
      setRatings(data.result.objectList);
    } catch (error) {
      console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
    }
  };

  const addToCart = (product) => {
    if (product.sizeDTOList && product.sizeDTOList.length > 0 && !selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
      return;
    }  

    const cart = JSON.parse(sessionStorage.getItem("cart")) || { totalPrice: 0, detailOrderRequestList: [] };

    const existingProduct = cart.detailOrderRequestList.find(
      (item) => item.idProduct === product.id && item.size === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.detailOrderRequestList.push({
        idProduct: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        img: product.img,
        quantity: 1,
      });
    }

    cart.totalPrice += product.price;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`Sản phẩm "${product.name}" (Size: ${selectedSize}) đã được thêm vào giỏ hàng!`);
  };

  return (
    <section id="prodetails">
        {product ? (
            <>
            <div className="single-pro-img">
                <img src={`images/product/${product.img}`} alt={product.name} />
            </div>
            <div className="single-pro-details">
                <h6>Home / {product.category}</h6>
                <h4>{product.name}</h4>
                <h2>
                {product.price.toLocaleString()} đ - {" "}
                {[...Array(5)].map((_, i) =>
                    i < product.rate ? (
                    <i key={i} className="fa-solid fa-star" style={{ color: "#f39c12" }}></i>
                    ) : (
                    <i key={i} className="fa-regular fa-star" style={{ color: "#f39c12" }}></i>
                    )
                )}
                </h2>
                <select
                name="size"
                className="custom-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                >
                <option value="">Chọn size</option>
                  {product.sizeDTOList && product.sizeDTOList.length > 0 &&
                    product.sizeDTOList.map((size) => (
                      <option key={size.size} value={size.size}>
                        {size.size}
                      </option>
                ))}
                </select>
                <button className="btn-add-cart normal" onClick={() => addToCart(product)}>
                Thêm vào giỏ hàng
                </button>
                <h4>Mô tả sản phẩm</h4>
                <p>{product.description}</p>
            </div>
            </>
        ) : (
            <p>Đang tải chi tiết sản phẩm...</p>
        )}

      
    </section>
  );
};

export default ProductDetails;
