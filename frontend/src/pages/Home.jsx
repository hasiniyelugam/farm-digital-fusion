import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  ShoppingBasket,
  Truck,
  Sprout,
} from "lucide-react";

import "./Home.css";

const categories = [
  {
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Flowers",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80",
  },
];

const products = [
  {
    id: 1,
    name: "Fresh Apples",
    category: "Fruits",
    price: 120,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 40,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Premium Rice",
    category: "Rice",
    price: 65,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Fresh Mangoes",
    category: "Fruits",
    price: 100,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80",
  },
];

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-small-text">
            <Sprout size={18} style={{ display: "inline", marginRight: "7px" }} />
            FRESH • LOCAL • DIRECT • TRUSTED
          </div>

          <h1 className="hero-title">
            Fresh From Farmers,
            <br />
            <span>Directly To You</span>
          </h1>

          <p className="hero-description">
            Discover fresh fruits, vegetables, rice, flowers and other
            agricultural products directly from local farmers.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-button-primary"
            >
              Explore Products
              <ArrowRight
                size={17}
                style={{
                  display: "inline",
                  marginLeft: "7px",
                  verticalAlign: "middle",
                }}
              />
            </Link>

            <Link
              to="/register"
              className="hero-button-secondary"
            >
              Join as Farmer
            </Link>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section">

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              <Leaf size={25} />
            </div>

            <h3>Fresh Products</h3>

            <p>
              Get fresh agricultural products directly from farmers.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <ShoppingBasket size={25} />
            </div>

            <h3>Direct Marketplace</h3>

            <p>
              Connect farmers directly with buyers and consumers.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <Truck size={25} />
            </div>

            <h3>Easy Delivery</h3>

            <p>
              Manage orders and delivery through one platform.
            </p>

          </div>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="home-section">

        <div className="section-heading">

          <div className="section-label">
            Explore Freshness
          </div>

          <h2 className="section-title">
            Shop By Category
          </h2>

          <p className="section-description">
            Explore fresh products from local farmers.
          </p>

        </div>


        <div className="category-grid">

          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="category-card"
            >

              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />

              <div className="category-info">

                <h3>{category.name}</h3>

                <p>
                  Fresh {category.name.toLowerCase()}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="products-section">

        <div className="products-container">

          <div className="section-heading">

            <div className="section-label">
              Farm Fresh
            </div>

            <h2 className="section-title">
              Featured Products
            </h2>

            <p className="section-description">
              Fresh products available directly from farmers.
            </p>

          </div>


          <div className="product-grid">

            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
              >

                <div className="product-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  <span className="fresh-badge">
                    Fresh
                  </span>

                </div>


                <div className="product-info">

                  <div className="product-category">
                    {product.category}
                  </div>

                  <h3 className="product-name">
                    {product.name}
                  </h3>

                  <div className="product-bottom">

                    <div className="product-price">
                      ₹{product.price}
                      <span>/{product.unit}</span>
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="product-view"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta-section">

        <div className="section-label">
          Support Local Farmers
        </div>

        <h2>
          Grow Together. Buy Direct.
        </h2>

        <p>
          Farm Digital Fusion brings farmers and buyers together
          through a simple and transparent digital marketplace.
        </p>

        <Link
          to="/register"
          className="cta-button"
        >
          Get Started
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="home-footer">

        <h2>
          🌱 Farm Digital Fusion
        </h2>

        <p>
          Connecting Farmers Directly With Buyers
        </p>

        <div className="footer-copy">
          © 2026 Farm Digital Fusion. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;