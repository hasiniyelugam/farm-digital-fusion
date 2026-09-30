import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[72px] border-b border-gray-100 bg-white shadow-sm">

      <div className="relative flex h-full w-full items-center px-6 md:px-8">

        {/* ================= CENTER LOGO ================= */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap text-2xl font-extrabold tracking-tight text-green-700 md:text-3xl"
        >
          <span className="text-3xl md:text-4xl">
            🌱
          </span>

          <span>
            Farm Digital Fusion
          </span>
        </Link>


        {/* ================= RIGHT SIDE NAVIGATION ================= */}
        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-2 md:right-8 md:gap-3">

          {/* Home */}
          <Link
            to="/"
            className="rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 md:px-5 md:text-lg"
          >
            Home
          </Link>


          {/* Products */}
          <Link
            to="/products"
            className="rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 md:px-5 md:text-lg"
          >
            Products
          </Link>


          {/* Login */}
          <Link
            to="/login"
            className="rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 md:px-5 md:text-lg"
          >
            Login
          </Link>


          {/* Register */}
          <Link
            to="/register"
            className="rounded-lg bg-green-700 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-green-800 md:px-6 md:text-lg"
          >
            Register
          </Link>


          {/* Cart */}
          <Link
            to="/cart"
            title="Shopping Cart"
            className="ml-1 flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <ShoppingCart
              size={25}
              strokeWidth={2}
            />
          </Link>


          {/* Profile */}
          <Link
            to="/login"
            title="Profile"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <User
              size={25}
              strokeWidth={2}
            />
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;