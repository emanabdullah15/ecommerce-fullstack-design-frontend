import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ filters, setFilters }) => {

  const handleCheckbox = (type, value) => {
    const newArr = filters[type].includes(value)
      ? filters[type].filter(f => f !== value)
      : [...filters[type], value];
    setFilters({ ...filters, [type]: newArr });
  };

  return (
    <div className="sidebar">
      <div className="filter-section">
        <h4>Brand</h4>
        {["Samsung","Apple","Poco","Lenovo"].map(b => (
          <label key={b}>
            <input type="checkbox" checked={filters.brand.includes(b)} onChange={() => handleCheckbox("brand", b)} /> {b}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Features</h4>
        {["Metallic","Plastic cover","Large Memory"].map(f => (
          <label key={f}>
            <input type="checkbox" checked={filters.feature.includes(f)} onChange={() => handleCheckbox("feature", f)} /> {f}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        {[5,4,3].map(r => (
          <label key={r}>
            <input type="checkbox" checked={filters.rating.includes(r)} onChange={() => handleCheckbox("rating", r)} /> {"⭐".repeat(r)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;