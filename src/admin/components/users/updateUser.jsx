import React, {useEffect, useState }  from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios";
import './user.css'

const UpdateUser = () => {
    const { idUser } = useParams();
    const token = sessionStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    

    useEffect(() => {
        // Fetch cities
        axios
            .get(
            "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            )
            .then((response) => setCities(response.data))
            .catch((error) => console.error("Error fetching cities:", error));
    }, []);

    useEffect(() => {
        // Reset districts and wards when the city changes
        setDistricts([]);
        setWards([]);
        if (selectedCity) {
            const city = cities.find((city) => city.Id === selectedCity);
            if (city) setDistricts(city.Districts);
        }
    }, [selectedCity, cities]);

    useEffect(() => {
        // Reset wards when the district changes
        setWards([]);
        if (selectedDistrict) {
            const district = districts.find(
            (district) => district.Id === selectedDistrict
            );
            if (district) setWards(district.Wards);
        }
    }, [selectedDistrict, districts]);

    return(
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Chỉnh Sửa Thông Tin </h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="/admin/admin">Trang Chủ</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a href="/admin/user">Người dùng</a>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <a className="active" href="/admin/upadte-user">Chỉnh SỬa Thông Tin</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="board">
                <div className="board1" style={{padding:"40px"}}>
                    <div className="row">
                        <div className="col-12 col-sm-10">
                            <label htmlFor="product-name" className="col-form-label">Họ và Tên:</label>
                            <textarea className="txt-input form-control" id="product-name"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 col-sm-10">
                            <label htmlFor="product-email" className="col-form-label">Email:</label>
                            <textarea className="txt-input form-control" id="product-eamil"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-form-label">Địa Chỉ:</label>
                        <div className="col-md-4">
                            <select className="form-select select-address" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                <option value="">Chọn tỉnh thành</option>
                                {cities.map((city) => (
                                    <option key={city.Id} value={city.Id}>{city.Name}</option>
                                ))}
                            </select>
                            <select className="form-select select-address" id="ward" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                                <option value="">Chọn phường xã</option>
                                {wards.map((ward) => (
                                    <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <select className="form-select select-address" id="district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                                <option value="">Chọn quận huyện</option>
                                {districts.map((district) => (
                                    <option key={district.Id} value={district.Id}>{district.Name}</option>
                                ))}
                            </select>
                            <input type="text" id="number-address" className="input-default" placeholder="Số nhà..." style={{padding:"23px", width:"100%"}}/>
                        </div>

                        <div className="col-md-4 d-flex flex-column align-items-center">
                            <a href="/admin/user">
                                <button className="btn btn-huy" style={{padding:"8px 30px"}}>Hủy</button>
                            </a>
                            <button className="btn btn-them" style={{padding:"8px 30px"}}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UpdateUser;