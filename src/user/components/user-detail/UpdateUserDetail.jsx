import React, { useEffect, useState } from "react";
import SideBar from "./side-bar";
import axios from "axios";
import './UserDetail.css';
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");

  const [user, setUser] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [numberAddress, setNumberAddress] = useState("");

  const fetchUserDetail = () => {
    const url = `http://localhost:8080/api/user/id/${idUser}`;
    axios
      .get(url)
      .then((response) => {
        const userData = response.data.result;
        setUser(userData);

        setSelectedCity(userData.city || "");
        setSelectedDistrict(userData.district || "");
        setSelectedWard(userData.ward || "");
        setNumberAddress(userData.numberAddress || "");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Lỗi không xác định";
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    setDistricts([]);
    setWards([]);

    if (selectedCity) {
      const cityObj = cities.find((city) => city.Name === selectedCity || city.Id === selectedCity);
      if (cityObj) setDistricts(cityObj.Districts);
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    setWards([]);

    if (selectedDistrict) {
      const districtObj = districts.find((district) => district.Name === selectedDistrict || district.Id === selectedDistrict);
      if (districtObj) setWards(districtObj.Wards);
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Lỗi fetch city:", error));

    fetchUserDetail();
  }, []);

  const handleHuy = () => {
    navigate("/user-detail");
  };

  const handleSubmit = () => {
    const cityObj = cities.find((city) => city.Id === selectedCity || city.Name === selectedCity);
    const districtObj = districts.find((district) => district.Id === selectedDistrict || district.Name === selectedDistrict);
    const wardObj = wards.find((ward) => ward.Id === selectedWard || ward.Name === selectedWard);

    const cityName = cityObj ? cityObj.Name : "";
    const districtName = districtObj ? districtObj.Name : "";
    const wardName = wardObj ? wardObj.Name : "";

    if (!user.gmail || !user.name || !cityName || !districtName || !wardName) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const dataToUpdate = {
      gmail: user.gmail,
      name: user.name,
      city: cityName,
      district: districtName,
      ward: wardName,
      numberAddress: numberAddress
    };

    axios
      .put(`http://localhost:8080/api/user/update/${idUser}`, dataToUpdate)
      .then((response) => {
        if (response.data.result === true) {
          alert("Cập nhật thông tin thành công!");
          navigate("/user-detail");
        } else {
          alert(response.data.message || "Cập nhật thất bại!");
        }
      })
      .catch((error) => {
        console.error("Lỗi cập nhật user:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Đã xảy ra lỗi khi cập nhật!");
      });
  };

  return (
    <div className="udetail">
      <SideBar />
      <div className="udetail-body" style={{ border: "2px solid #cfcaca", borderRadius: "5px", padding: "50px" }}>
        <h3>Họ và tên:</h3>
        <input
          className="txt-input form-control"
          id="name"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <h3 style={{ marginTop: "20px" }}>Gmail:</h3>
        <input
          className="txt-input form-control"
          id="gmail"
          value={user.gmail || ""}
          onChange={(e) => setUser({ ...user, gmail: e.target.value })}
        />

        <h3 style={{ marginTop: "20px" }}>Địa chỉ:</h3>
        <div style={{ display: "flex" }}>
          <div className="cardholder-name col-6" style={{ marginRight: "10px" }}>
            <select
              className="form-select select-address"
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Chọn tỉnh thành</option>
              {cities.map((city) => (
                <option key={city.Id} value={city.Name}>
                  {city.Name}
                </option>
              ))}
            </select>

            <select
              className="form-select select-address"
              id="ward"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              <option value="">Chọn phường xã</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Name}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="cardholder-name col-6">
            <select
              className="form-select select-address"
              id="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Chọn quận huyện</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Name}>
                  {district.Name}
                </option>
              ))}
            </select>

            <input
              type="text"
              id="number-address"
              className="input-default"
              placeholder="Số nhà..."
              style={{ width: "450px" }}
              value={numberAddress}
              onChange={(e) => setNumberAddress(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "120px" }}>
            <button
              style={{
                border: "0",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "white",
                padding: "10px"
              }}
              type="button"
              onClick={handleHuy}
            >
              Hủy
            </button>

            <button
              style={{
                border: "0",
                borderRadius: "5px",
                backgroundColor: "#008080",
                color: "white",
                padding: "10px"
              }}
              type="button"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
