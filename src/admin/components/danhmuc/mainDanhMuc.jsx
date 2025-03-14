import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Main = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchCate();
    }, []);

    const fetchCate = () => {
        const url = "http://localhost:8080/api/category/getAll";
        axios 
            .get(url)
            .then((response) => {
                setCategory(response.data.result);
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("Lỗi khi fetch dữ liệu: ", errorMessage);
            })
    }

    const handleEditDanhMuc = (idDanhMuc) => {
        navigate(`/admin/update-danhmuc/${idDanhMuc}`);  
      };

    const handleDeleteDanhMuc = (idDanhMuc) => {
        const url = `http://localhost:8080/api/category/delete/${idDanhMuc}`;
        axios
            .delete(url)
            .then((reponse) =>{
                alert("Xóa danh mục thành công");
                fetchCate();
            })
            .catch((error) => {
                alert(`Lỗi khi xóa danh mục: ${error.reponse.data.message}`)
            })
    }

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Danh Mục</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/danhmuc">Danh Mục</a>
                        </li>
                    </ul>
                </div>
            </div>

            <a type="button" className="btn btn-ThemMoi" href="/admin/create-danhmuc">
                Thêm Mới
            </a>

            <div className="table-data">
                <div className="order">
                <div className="head">
                    <h3>Danh Sách Danh Mục</h3>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Danh Mục</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.map((cate)=> (
                        <tr key={cate.id}>
                            <td style={{padding:"0px 20px"}}>{cate.id}</td>
                            <td><p>{cate.name}</p></td>
                            <td style={{display:"flex", paddingTop:"20px", paddingBottom:"10px"}} >
                                <div>
                                    <button type="button" className="btn btn-success btn-product-modal"  onClick={() => handleEditDanhMuc(cate.id)}> 
                                        
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-warning btn-delete-product" onClick={() => handleDeleteDanhMuc(cate.id)}> 
                                    
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

export default Main;