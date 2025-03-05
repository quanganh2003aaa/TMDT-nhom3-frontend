import React from "react";
import './banner.css'

const Banner = () => {
  return (
    <div className="Homebanner"> 
      <div className="Homepro">
        <div
          className="Homesoda"
          style={{ "--url": "url('../images/ao_4.png')" }}
        ></div>
        <div
          className="Homesoda"
          style={{ "--url": "url('../images/ao_2.png')" }}
        ></div>
      </div>
      <div className="Homerock">
        <img src="images/rock1.png" alt="" />
        <img src="images/rock2.png" alt="" />
        <img src="images/rock3.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
