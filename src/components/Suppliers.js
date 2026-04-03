// import React from "react";
import { FlagIcon } from "react-flag-kit";
import "../styles/Suppliers.css";

const Suppliers = () => {
  const countries = [
    { name: "United States", code: "US", site: "shopname.com" },
    { name: "Germany", code: "DE", site: "shopname.de" },
    { name: "United Kingdom", code: "GB", site: "shopname.co.uk" },
    { name: "Russia", code: "RU", site: "shopname.ru" },
    { name: "Italy", code: "IT", site: "shopname.it" },
    { name: "Australia", code: "AU", site: "shopname.au" },
    { name: "United Arab Emirates", code: "AE", site: "shopname.ae" },
    { name: "China", code: "CN", site: "shopname.cn" },
    { name: "Pakistan", code: "PK", site: "shopname.pk" },
    { name: "France", code: "FR", site: "shopname.fr" },
  ];

  return (
    <section className="regions-section container my-5">
      <h5 className="mb-4">Suppliers by region</h5>
      <div className="regions-grid">
        {countries.map((item, idx) => (
          <div className="region-item" key={idx}>
            <FlagIcon code={item.code} size={32} />
            <div className="region-text">
              <h6>{item.name}</h6>
              <p>{item.site}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Suppliers;