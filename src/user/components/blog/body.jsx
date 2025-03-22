import React, { useEffect, useState } from "react";
import './blog.css'
import axios from "axios";

const Body = () => {
    const [blog, setBlog] = useState([]);

    const fetchBlog = () => {
        axios
            .get("http://localhost:8080/api/blog/getAll")
            .then((response)=> {
                setBlog(response.data.result);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }
    
    useEffect(()=> {
        fetchBlog();
    }, [])

  return (
    <section id="blog">
        {blog.map((blog, index) => {
            const date = new Date(blog.createdAt);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

            return(
                <div className="blog-box" key={index + 1}>
                    <div className="blog-img">
                        <img src={`./images/blog_${index+1}.png`} alt={blog.title}/>
                    </div>
                    <div className="blog-details">
                        <h4>{blog.title}</h4>
                        <a href={`/blog-detail/${blog.id}`}>TIẾP TỤC ĐỌC</a>
                    </div>
                    <h1>{formattedDate}</h1>
                </div>
            );
        })}
    </section>
  );
};

export default Body;
