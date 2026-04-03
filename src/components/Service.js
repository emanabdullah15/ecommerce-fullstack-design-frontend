// import React from "react";
import { FaCog, FaShieldAlt, FaUser, FaLaptopCode  } from "react-icons/fa";

import service1 from "../assets/images/services/image 108.png"; 
import service2 from "../assets/images/services/image 104.png"; 
import service3 from "../assets/images/services/image 106.png"; 
import service4 from "../assets/images/services/image 107.png"; 

import "../styles/service.css";

const Services = () => {
  const data = [
    {
      title: "Source from Industry Hubs",
      desc: "Find suppliers easily",
      img: service1,
      icon: FaCog,
    },
    {
      title: "Customize Your Products",
      desc: "With your branding",
      img: service2,
      icon: FaShieldAlt,
    },
    {
      title: "Fast, reliable shipping",
      desc: "Across the world",
      img: service3,
      icon: FaUser,
    },
    {
      title: "Product monitoring",
      desc: "Ensure quality control",
      img: service4,
      icon: FaLaptopCode ,
    },
  ];

  return (
    <section className="services-section container my-5">
      <h5 className="mb-4">Our Extra Services</h5>

      <div className="row g-3">
        {data.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="service-card">
              
              {/* IMAGE */}
              <div className="image-box">
                <img src={item.img} alt={item.title} />
              </div>

              {/* ICON */}
              <div className="icon-box">
                <item.icon size={28} color="#0d6efd" />
              </div>

              {/* TEXT */}
              <div className="content">
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;