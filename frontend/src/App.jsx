import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/farmer/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f6f8f4]">
        <Navbar />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Farmer Dashboard */}
          <Route
            path="/farmer-dashboard"
            element={<FarmerDashboard />}
          />

          {/* Add Product */}
          <Route
            path="/farmer/add-product"
            element={<AddProduct />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;