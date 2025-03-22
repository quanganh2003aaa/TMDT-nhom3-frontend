import React, { useState, useEffect } from "react";
import './ProductReview.css'
import $ from "jquery";

const ProductReview = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [ratings, setRatings] = useState([]);

  const productId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
      fetchRatings();
    }, [productId]);

  const handleReviewSubmit = () => {
    const idUser = sessionStorage.getItem("idUser");
    const token = sessionStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!idUser) {
      alert("Bạn phải đăng nhập trước!");
      window.location.href = "/login"; 
      return;
    }

    if (selectedRating === 0 || reviewContent.trim() === "") {
      alert("Vui lòng chọn số sao và nhập nội dung đánh giá!");
      return;
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/rate/create",
      contentType: "application/json",
      data: JSON.stringify({
        rate: selectedRating,
        content: reviewContent,
        user: idUser,
        idProduct: productId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function () {
        alert("Đánh giá thành công!");
        window.location.reload();
      },
      error: function (xhr) {
        const responseObj = JSON.parse(xhr.responseText);
        alert(responseObj.message);
        window.location.reload();
      },
    });
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

  return (
    <section id="form-details">
      <h2>
        Đánh giá của bạn giúp chúng tôi tốt hơn từng ngày!
      </h2>
      <div className="listrate-product">
      <ul className="list-rate-product">
        {ratings.map((rating, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex">
              <img src="images/avatar.png" alt="avatar" style={{maxHeight: "50px", borderRadius:"25px"}}/>
              <div>
                <span style={{padding:"0 0 0 5px", fontWeight:"500"}}>{rating.user} - </span>
                {[...Array(5)].map((_, i) =>
                  i < rating.rate ? (
                    <i key={i} className="fa-solid fa-star" style={{ color: "#f39c12" }}></i>
                  ) : (
                    <i key={i} className="fa-regular fa-star" style={{ color: "#f39c12" }}></i>
                  )
                )}
                <p style={{margin:"0", padding:"0 0 0 5px"}}>{new Date(rating.createdDate).toLocaleDateString("vi-VN")}</p>
                <p style={{margin:"0", padding:"0 0 0 5px"}}>{rating.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};

export default ProductReview;
