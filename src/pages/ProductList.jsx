import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "../styles/productList.css";
import { FaTh, FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const categoryFolder = {
  "consumer-electronics": "tech",
  "home-outdoor": "interior",
  "recommended": "cloth",
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    brands: [],
    features: [],
    condition: "",
    category: "",
    search: "",
  });

  const productsPerPage = 6;

  // Read query params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category") || "";
    const searchParam = params.get("search") || "";

    setFilters((prev) => ({
      ...prev,
      category: categoryParam,
      search: searchParam,
    }));
  }, [location.search]);

  // Fetch products whenever filters change
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(filters);
      setProducts(data);
    };
    getProducts();
  }, [filters]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`, { state: product });
  };

  const handleBrandChange = (brand) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const handleFeatureChange = (feature) => {
    setFilters((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleConditionChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      condition: value,
    }));
  };

  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = products.slice(indexOfLast - productsPerPage, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="sidebar p-3 bg-white border rounded">
            <div className="mb-4">
              <h6 className="fw-bold">Category</h6>
              <ul className="list-unstyled sidebar-list">
                {Object.keys(categoryFolder).map((cat) => (
                  <li
                    key={cat}
                    style={{ cursor: "pointer" }}
                    className={filters.category === categoryFolder[cat] ? "text-primary" : ""}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        category: categoryFolder[cat],
                      }))
                    }
                  >
                    {cat.replace("-", " ")}
                  </li>
                ))}
                <li className="text-primary small">See all</li>
              </ul>
            </div>

            {/* Brands */}
            <div className="mb-4">
              <h6 className="fw-bold">Brands</h6>
              {["Samsung", "Apple", "Huawei", "Poco", "Lenovo"].map((b) => (
                <div className="form-check" key={b}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => handleBrandChange(b)}
                  />
                  <label className="form-check-label">{b}</label>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-4">
              <h6 className="fw-bold">Features</h6>
              {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map((f) => (
                <div className="form-check" key={f}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => handleFeatureChange(f)}
                  />
                  <label className="form-check-label">{f}</label>
                </div>
              ))}
            </div>

            {/* Condition */}
            <div className="mb-4">
              <h6 className="fw-bold">Condition</h6>
              {["Any", "Refurbished", "Brand new", "Old items"].map((c) => (
                <div className="form-check" key={c}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="condition"
                    onChange={() => handleConditionChange(c)}
                  />
                  <label className="form-check-label">{c}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <button
                className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"} me-2`}
                onClick={() => setView("grid")}
              >
                <FaTh />
              </button>
              <button
                className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setView("list")}
              >
                <FaBars />
              </button>
            </div>
            <p>Total {products.length} items</p>
          </div>

          <div className={view === "grid" ? "row row-cols-1 row-cols-md-3 g-4" : "list-group"}>
            {currentProducts.map((item) =>
              view === "grid" ? (
                <div className="col" key={item._id}>
                  <div className="card h-100">
                    <img src={item.img || "/placeholder.png"} className="card-img-top" alt={item.name} />
                    <div className="card-body">
                      <h6>{item.name}</h6>
                      <p>${item.price}</p>
                      <button className="btn btn-primary btn-sm" onClick={() => handleViewDetails(item)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="list-group-item d-flex" key={item._id}>
                  <img src={item.img || "/placeholder.png"} style={{ width: "100px", objectFit: "cover" }} alt={item.name} />
                  <div className="ms-3">
                    <h6>{item.name}</h6>
                    <p>${item.price}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => handleViewDetails(item)}>
                      View Details
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          <ul className="pagination justify-content-center mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <li className="page-item" key={i}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;