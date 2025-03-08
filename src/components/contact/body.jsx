import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './contact.css'

const customIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/images/logo_s.png", // Đảm bảo icon từ public folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
});

const Body = () => {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  const stores = [
    { id: 1, name: "Store A", latitude: 20.980767, longitude: 105.788816 },
    { id: 2, name: "Store B", latitude: 21.024348, longitude: 105.832739 },
    { id: 3, name: "Store C", latitude: 40.689629, longitude: -74.045770 }
  ];

  useEffect(() => {
    if (stores.length > 0) {
        setSelectedStore(stores[0]);
    }
  }, []);

  const handleSearch = () => {
    const store = stores.find((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    if (store) {
        setSelectedStore(store);
    } else {
        alert("Không tìm thấy cửa hàng!");
    }
  };

  const MapSearch = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (map && position) {
            map.setView(position, 15);
        }
    }, [position, map]);
    return null;
  };


  return (
    <section id="contact-details" className="section-p1">
      <div className="details">
        <img src="./images/contact_2.png" alt="Contact" />
        <br />
        <span>
          Sneaker Studio international được thành lập từ năm 2015, là chuỗi bán lẻ Sneaker, Streetwear và phụ kiện thời trang
          chính hãng có thị phần số 1 Việt Nam với số lượt truy cập mua hàng tại website sneakerstudio.com lên tới trên 10.000
          lượt mỗi ngày từ khắp 63 tỉnh thành trên cả nước.
        </span>
        <h3>Trụ sở chính (Store A)</h3>
        <ul>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>P. Văn Quán, Hà Đông, Hà Nội, Việt Nam</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>088 xxxxx55</p>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>Service@SneakerStudio.com</p>
          </li>
        </ul>

        <h3>Store B</h3>
        <ul>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>P. Tôn Đức Thắng, Đống Đa, Hà Nội, Việt Nam</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>086 xxxxx29</p>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>Service@SneakerStudio.com</p>
          </li>
        </ul>

        <h3>Store C</h3>
        <ul>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>Liberty, JerSey, NewYork, American</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>19 xxxxx86</p>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>Service@SneakerStudio.com</p>
          </li>
        </ul>
      </div>

      <div className="map">
        <div className="search-bar">
          <input
              type="text"
              placeholder="Tìm kiếm cửa hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>


        {selectedStore && (
          <MapContainer
              center={[selectedStore.latitude, selectedStore.longitude]}
              zoom={15}
              style={{ height: "500px", width: "100%" }}
          >
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {stores.map((store) => (
                  <Marker
                      key={store.id}
                      position={[store.latitude, store.longitude]}
                      icon={customIcon} // Icon cửa hàng
                  >
                      <Popup>{store.name}</Popup>
                  </Marker>
              ))}
              <MapSearch position={[selectedStore.latitude, selectedStore.longitude]} />
          </MapContainer>
        )}
      </div>
    </section>
  );
};

export default Body;
