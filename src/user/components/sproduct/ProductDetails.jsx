import React, { useState, useEffect } from "react";
import './ProductDetail.css'

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const productId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
    fetchRatings();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/product/id/${productId}`);
      const data = await response.json();

      const sortedImages = data.result.img.sort((a, b) => a.indexImg - b.indexImg);
      data.result.img = sortedImages;

      setProduct(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/product/getIndex");
      const data = await response.json();
      setRelatedProducts(data.result);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm liên quan:", error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/rate/${productId}`);
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

  const changeImage = (index) => {
    setCurrentImgIndex(index);
  };

  return (
    <section id="prodetails">
        {product ? (
            <>
            <div className="single-pro-img">
              <img
                src={`images/product/${product.img[currentImgIndex].img}`}
                alt={product.name}
                className="main-image"
              />
              <div className="thumbnail-container">
                {product.img.map((image, index) => (
                  <img
                    key={index}
                    src={`images/product/${image.img}`}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail ${index === currentImgIndex ? "active" : ""}`}
                    onClick={() => changeImage(index)}
                  />
                ))}
              </div>
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
                  {product.sizeList && product.sizeList.length > 0 &&
                    product.sizeList.map((size) => (
                      <option key={size} value={size}>
                        {size}
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
