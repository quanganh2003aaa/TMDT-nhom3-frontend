import React from "react";
import './blog.css'

const Body = () => {
  return (
    <section id="blog">
        <div className="blog-box">
        <div className="blog-img">
            <img src="./images/blog_1.png" alt=""/>
        </div>
        <div className="blog-details">
            <h4>Elliott Hill: Vẽ nên tương lai tươi sáng cho Nike</h4>
            <a href="#">TIẾP TỤC ĐỌC</a>
        </div>
        <h1>22/10</h1>
        </div>
        <div className="blog-box">
        <div className="blog-img">
            <img src="./images/blog_2.png" alt=""/>
        </div>
        <div className="blog-details">
            <h4>New Balance 990v6: Hành trình thống trị giới giày thể thao</h4>
            <a href="#">TIẾP TỤC ĐỌC</a>
        </div>
        <h1>22/10</h1>
        </div>
        <div className="blog-box">
        <div className="blog-img">
            <img src="./images/blog_3.png" alt=""/>
        </div>
        <div className="blog-details">
            <h4>5 phong cách thu siêu hot không thể bỏ qua</h4>
            <a href="#">TIẾP TỤC ĐỌC</a>
        </div>
        <h1>16/10</h1>
        </div>
        <div className="blog-box">
        <div className="blog-img">
            <img src="./images/blog_4.png" alt=""/>
        </div>
        <div className="blog-details">
            <h4>Theo chân Louis Vuitton khám phá thế giới sneaker</h4>
            <a href="#">TIẾP TỤC ĐỌC</a>
        </div>
        <h1>15/10</h1>
        </div>
        <div className="blog-box">
        <div className="blog-img">
            <img src="./images/blog_5.png" alt=""/>
        </div>
        <div className="blog-details">
            <h4>Bí kíp thời trang nam mùa thu đông 2024</h4>
            <a href="#">TIẾP TỤC ĐỌC</a>
        </div>
        <h1>9/10</h1>
        </div>
    </section>
  );
};

export default Body;
