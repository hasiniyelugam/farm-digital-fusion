import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Leaf,
  ArrowLeft,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Terms validation
    if (!formData.agree) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      // Send registration data to FastAPI
      const response = await fetch(
        "http://127.0.0.1:8001/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      // Registration failed
      if (!response.ok) {
        alert(
          data.detail || "Registration failed. Please try again."
        );
        return;
      }

      // Registration successful
      alert(
        "Account created successfully! Please login."
      );

      // Go to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 25px",
        boxSizing: "border-box",
      }}
    >
      {/* MAIN CARD */}

      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        }}
      >
        {/* ================= LEFT SIDE ================= */}

        <div
          style={{
            minHeight: "680px",
            backgroundImage:
              "linear-gradient(rgba(22,101,52,0.55), rgba(20,83,45,0.78)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px",
            boxSizing: "border-box",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "600",
              width: "fit-content",
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div
            style={{
              maxWidth: "410px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px",
              }}
            >
              <Leaf size={32} />
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "44px",
                lineHeight: "1.15",
                fontWeight: "800",
              }}
            >
              Join Farm Digital Fusion
            </h1>

            <p
              style={{
                marginTop: "20px",
                fontSize: "17px",
                lineHeight: "1.7",
                color: "#f0fdf4",
              }}
            >
              Create your account and connect directly with
              farmers and buyers through our agricultural
              marketplace.
            </p>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#dcfce7",
            }}
          >
            Fresh • Local • Direct • Trusted
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div
          style={{
            padding: "45px 60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "410px",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "27px",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  margin: "0 auto 14px",
                  borderRadius: "15px",
                  background: "#dcfce7",
                  color: "#15803d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={28} />
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#111827",
                }}
              >
                Create Account
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Join our farming marketplace
              </p>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>
              {/* NAME */}

              <div style={{ marginBottom: "17px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  Full Name
                </label>

                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 14px",
                    boxSizing: "border-box",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* EMAIL */}

              <div style={{ marginBottom: "17px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 14px",
                    boxSizing: "border-box",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* ROLE */}

              <div style={{ marginBottom: "17px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  I want to join as
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 14px",
                    boxSizing: "border-box",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    background: "#ffffff",
                    fontSize: "14px",
                    color: "#374151",
                    outline: "none",
                  }}
                >
                  <option value="buyer">
                    Buyer / Customer
                  </option>

                  <option value="farmer">
                    Farmer
                  </option>
                </select>
              </div>

              {/* PASSWORD */}

              <div style={{ marginBottom: "17px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  Password
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 48px 0 14px",
                      boxSizing: "border-box",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    style={{
                      position: "absolute",
                      right: "6px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#6b7280",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  Confirm Password
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 48px 0 14px",
                      boxSizing: "border-box",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "6px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#6b7280",
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* TERMS */}

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#4b5563",
                  lineHeight: "1.5",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginTop: "2px",
                    accentColor: "#15803d",
                  }}
                />

                <span>
                  I agree to the Terms and Conditions
                  and Privacy Policy.
                </span>
              </label>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "50px",
                  border: "none",
                  borderRadius: "9px",
                  background: loading
                    ? "#86b99a"
                    : "#15803d",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            {/* LOGIN LINK */}

            <div
              style={{
                marginTop: "22px",
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Already have an account?

              <Link
                to="/login"
                style={{
                  marginLeft: "5px",
                  color: "#15803d",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;