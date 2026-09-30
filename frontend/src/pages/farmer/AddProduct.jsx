import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // Validate required fields
    // -----------------------------

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.price ||
      !formData.quantity
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // -----------------------------
    // Get JWT token
    // -----------------------------

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login as a farmer first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // Product data
      // -----------------------------

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        description: formData.description.trim() || null,
      };

      // -----------------------------
      // Send request to FastAPI
      // -----------------------------

      const response = await fetch(
        "http://127.0.0.1:8001/products/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(productData),
        }
      );

      // -----------------------------
      // Read backend response
      // -----------------------------

      const data = await response.json();

      // -----------------------------
      // Handle backend errors
      // -----------------------------

      if (!response.ok) {
        console.error("Product API error:", data);

        if (response.status === 401) {
          alert(
            "Your login session has expired. Please login again."
          );

          localStorage.removeItem("access_token");
          localStorage.removeItem("user");

          navigate("/login");

          return;
        }

        if (response.status === 403) {
          alert(
            data.detail ||
              "Only farmers can add products."
          );

          return;
        }

        if (response.status === 422) {
          alert(
            data.detail
              ? JSON.stringify(data.detail)
              : "Please check the product details."
          );

          return;
        }

        alert(
          data.detail ||
            `Unable to add product. Server error: ${response.status}`
        );

        return;
      }

      // -----------------------------
      // Success
      // -----------------------------

      console.log(
        "Product created successfully:",
        data
      );

      alert("Product added successfully!");

      // Clear form
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });

      // Return to farmer dashboard
      navigate("/farmer-dashboard");
    } catch (error) {
      console.error("Add product error:", error);

      alert(
        "Unable to connect to the backend. Please make sure FastAPI is running on port 8001."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background: "#f5f8f3",
        padding: "50px 25px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Back to Dashboard */}

        <Link
          to="/farmer-dashboard"
          style={{
            color: "#15803d",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Farmer Dashboard
        </Link>

        {/* Form Card */}

        <div
          style={{
            background: "#ffffff",
            marginTop: "25px",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              color: "#166534",
              marginBottom: "8px",
            }}
          >
            Add Product
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "30px",
            }}
          >
            Add your agricultural product to the marketplace.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Product Name */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Product Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Fresh Tomatoes"
                required
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Category */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  background: "#ffffff",
                  fontSize: "15px",
                }}
              >
                <option value="">
                  Select Category
                </option>

                <option value="vegetables">
                  Vegetables
                </option>

                <option value="fruits">
                  Fruits
                </option>

                <option value="grains">
                  Grains
                </option>

                <option value="millets">
                  Millets
                </option>

                <option value="pulses">
                  Pulses
                </option>

                <option value="spices">
                  Spices
                </option>
              </select>
            </div>

            {/* Price + Quantity */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Price */}

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Price (₹) *
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="40"
                  min="0.01"
                  step="0.01"
                  required
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Quantity */}

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Quantity (kg) *
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="100"
                  min="0.01"
                  step="0.01"
                  required
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Description */}

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows="5"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "15px",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  height: "50px",
                  border: "none",
                  borderRadius: "9px",
                  background: loading
                    ? "#86b99a"
                    : "#15803d",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loading
                  ? "Saving..."
                  : "Save Product"}
              </button>

              <Link
                to="/farmer-dashboard"
                style={{
                  flex: 1,
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  color: "#374151",
                  textDecoration: "none",
                  fontWeight: "600",
                  boxSizing: "border-box",
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;