// import { useState, useEffect } from "react";
// import axios from "axios";

// const EditProductModal = ({ idProduct, onSave, onClose }) => {
//     const [formData, setFormData] = useState({
//         id: "",
//         img:"",
//         name: "",
//         category: "1",
//         size: "",
//         quantity: "",
//         price: "",
//         description: "",
//       });
    
//       useEffect(() => {
//         if (idProduct) {
//           fetchProductDetails(idProduct);
//         }
//       }, [idProduct]);
    
//       // 📌 Gọi API để lấy dữ liệu sản phẩm
//       const fetchProductDetails = async (idProduct) => {
//         try {
//           const response = await axios.get(`http://localhost:8080/product/detail/${idProduct}`);
//           const product = response.data.result;

//           const sizeList = product.sizeDTOList ? product.sizeDTOList.map(s => s.size).join(", ") : "";

//           const categoryMap = {
//             "Giày": 1,
//             "Quần Áo": 2,
//             "Phụ Kiện": 3,
//         };
    
//           // Cập nhật state với dữ liệu từ API
//           setFormData({
//             id: product.id,
//             img: product.img,
//             name: product.name,
//             category: categoryMap[product.category] || 0,
//             size: sizeList,
//             quantity: product.quantity,
//             price: product.price,
//             description: product.description,
//           });
//         } catch (error) {
//           console.error("Lỗi khi lấy thông tin sản phẩm:", error);
//         }
//       };

//       const handleCloseModal = () => {
//         const modalElement = document.getElementById('editModal');
//         if (modalElement) {
//           const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
//           if (modalInstance) {
//             modalInstance.hide();
//           }
//         }
        
//         // 🔹 Xóa lớp backdrop nếu còn tồn tại
//         const backdrop = document.querySelector('.modal-backdrop');
//         if (backdrop) {
//           backdrop.remove();
//         }
      
//         onClose();
//       };      
 
//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: name === "category" ? Number(value) : value,  // ✅ Ép kiểu số cho category
//         }));
//     };
        
//       const handleSaveProduct = () => {
//         const formDataToSend = new FormData();
        
//         formDataToSend.append("name", formData.name);
//         formDataToSend.append("size", formData.size);
//         formDataToSend.append("category", formData.category);
//         formDataToSend.append("quantity", formData.quantity);
//         formDataToSend.append("price", formData.price);
//         formDataToSend.append("description", formData.description);
    
//         // Lấy tệp ảnh mới nếu có
//         const fileInput = document.getElementById("product-image");
//         if (fileInput.files.length > 0) {
//             formDataToSend.append("file", fileInput.files[0]); // Gửi ảnh mới
//         } else {
//             formDataToSend.append("file", formData.img); // Giữ ảnh cũ
//         }

//         console.log("🚀 Dữ liệu FormDataToSend:");
//         formDataToSend.forEach((value, key) => {
//             console.log(`${key}: ${value}`);
//         });

//         handleCloseModal();
//         onSave(formDataToSend);
//     };
    

//   return (
//     <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
//       <div className="modal-dialog">
//         <div className="modal-content" style={{ width: "900px", marginLeft: "-180px" }}>
//           <div className="modal-header">
//             <h1 className="modal-title fs-5" id="exampleModalLabel">Sửa Sản Phẩm</h1>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <form>
//               <div className="row">
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-id" className="col-form-label">Mã Sản Phẩm:</label>
//                   <input className="form-control" id="product-id" value={formData.id} disabled />
//                 </div>
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-image" className="col-form-label">Ảnh:</label>
//                   <input type="file" id="product-image" name="image" accept="images/*" />
//                   <img src={`../images/product/${formData.img}`} alt="Hình ảnh sản phẩm" style={{maxWidth: "160px", height: "auto"}}/>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-name" className="col-form-label">Tên Sản Phẩm:</label>
//                   <input className="form-control" id="product-name" name="name" value={formData.name || ""} onChange={handleChange} />
//                 </div>
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-category" className="col-form-label">Loại sản phẩm:</label>
//                   <select className="form-control" id="product-category" name="category" value={formData.category} onChange={handleChange}>
//                     <option value={1}>Giày</option>
//                     <option value={2}>Quần áo</option>
//                     <option value={3}>Phụ kiện</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-size" className="col-form-label">Size:</label>
//                   <textarea className="form-control" id="product-size" name="size" value={formData.size || ""} onChange={handleChange} />
//                 </div>
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-quantity" className="col-form-label">Kho:</label>
//                   <input className="form-control" id="product-quantity" name="quantity" value={formData.quantity || ""} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-price" className="col-form-label">Giá:</label>
//                   <input className="form-control" id="product-price" name="price" value={formData.price || ""} onChange={handleChange} />
//                 </div>
//                 <div className="col-8 col-sm-6">
//                   <label htmlFor="product-description" className="col-form-label">Mô Tả:</label>
//                   <textarea className="form-control" id="product-description" name="description" value={formData.description || ""} onChange={handleChange}></textarea>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Hủy</button>
//             <button type="button" className="btn btn-primary" onClick={handleSaveProduct}>Lưu</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;
