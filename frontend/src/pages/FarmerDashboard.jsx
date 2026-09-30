import { Link } from "react-router-dom";

function FarmerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        padding: "50px",
        background: "#f5f8f3",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "30px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              color: "#15803d",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Farmer Dashboard
          </p>

          <h1
            style={{
              fontSize: "32px",
              color: "#166534",
              marginBottom: "10px",
            }}
          >
            Welcome, {user?.full_name || "Farmer"} 👋
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Manage your products, inventory, orders and farming
            activities from one place.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <DashboardCard
            title="My Products"
            description="Add and manage your agricultural products."
            icon="🌾"
          />

          <DashboardCard
            title="Inventory"
            description="Track your available stock and quantities."
            icon="📦"
          />

          <DashboardCard
            title="Orders"
            description="View and manage customer orders."
            icon="🛒"
          />

          <DashboardCard
            title="Payments"
            description="View your sales and payment information."
            icon="💰"
          />
        </div>

        {/* Quick Actions */}
        <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "18px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              color: "#166534",
              marginBottom: "20px",
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <button
              style={{
                padding: "13px 22px",
                border: "none",
                borderRadius: "10px",
                background: "#15803d",
                color: "#ffffff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              + Add Product
            </button>

            <button
              style={{
                padding: "13px 22px",
                border: "1px solid #15803d",
                borderRadius: "10px",
                background: "#ffffff",
                color: "#15803d",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View Orders
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#15803d",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  icon,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "20px",
          color: "#166534",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#6b7280",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default FarmerDashboard;