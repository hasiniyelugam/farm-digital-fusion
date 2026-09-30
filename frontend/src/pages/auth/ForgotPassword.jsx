import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    alert("Password reset link will be sent to your email.");
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
        {/* Left Side */}
        <div
          style={{
            minHeight: "520px",
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
            <h2 style={{ fontSize: "30px", margin: "12px 0" }}>
              Farm Digital Fusion
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              Connecting farmers and buyers through a smarter digital
              marketplace.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            padding: "55px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#15803d",
              textDecoration: "none",
              fontWeight: "600",
              marginBottom: "35px",
            }}
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <h1
            style={{
              fontSize: "32px",
              color: "#166534",
              marginBottom: "10px",
            }}
          >
            Forgot Password?
          </h1>

          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            Enter your registered email address and we'll help you reset your
            password.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 15px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "16px",
                outline: "none",
                marginBottom: "22px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#15803d",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Send Reset Link
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#6b7280",
            }}
          >
            Remember your password?{" "}
            <Link
              to="/login"
              style={{
                color: "#15803d",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;