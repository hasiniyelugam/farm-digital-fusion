import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Send login request to FastAPI
      const response = await fetch(
        "http://127.0.0.1:8001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        alert(data.detail || "Invalid email or password.");
        return;
      }

      // -------------------------
      // Save authentication data
      // -------------------------

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // -------------------------
      // Role-based navigation
      // -------------------------

      alert("Login successful!");

      if (data.user.role === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        // Buyer
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "#f5f8f3",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 10px 35px rgba(0,0,0,0.10)",
        }}
      >
        {/* =========================
            LEFT SIDE
        ========================= */}

        <div
          style={{
            minHeight: "560px",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "white",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.45)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Leaf size={35} />

            <h2
              style={{
                fontSize: "30px",
                margin: "12px 0",
                fontWeight: "700",
              }}
            >
              Farm Digital Fusion
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Connecting farmers and buyers through a smarter
              digital marketplace.
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div
          style={{
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Back to Home */}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#15803d",
              textDecoration: "none",
              fontWeight: "600",
              marginBottom: "30px",
              width: "fit-content",
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          {/* Heading */}

          <h1
            style={{
              fontSize: "32px",
              color: "#166534",
              margin: "0 0 10px 0",
              fontWeight: "700",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: "#6b7280",
              margin: "0 0 30px 0",
              lineHeight: "1.6",
            }}
          >
            Sign in to continue to Farm Digital Fusion.
          </p>

          {/* =========================
              LOGIN FORM
          ========================= */}

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div
              style={{
                marginBottom: "22px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#374151",
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "14px 15px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}

            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#374151",
                }}
              >
                Password
              </label>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding:
                      "14px 48px 14px 15px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    border: "none",
                    background:
                      "transparent",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "25px",
                gap: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#4b5563",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                Remember me
              </label>

              <Link
                to="/forgot-password"
                style={{
                  color: "#15803d",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                background: loading
                  ? "#86b99a"
                  : "#15803d",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          {/* Register Link */}

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#6b7280",
            }}
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              style={{
                color: "#15803d",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;