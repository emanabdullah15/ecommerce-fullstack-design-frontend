import API from "../api";

export const fetchProducts = async (filters = {}) => {
  try {
    const params = {};

    // 🔥 BRAND FILTER
    if (filters.brands && filters.brands.length > 0) {
      params.brand = filters.brands.join(",");
    }

    // 🔥 FEATURE FILTER
    if (filters.features && filters.features.length > 0) {
      params.features = filters.features.join(",");
    }

    // 🔥 CONDITION FILTER
    if (filters.condition) {
      params.condition = filters.condition;
    }
    

    const response = await API.get("/products", { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  
};
