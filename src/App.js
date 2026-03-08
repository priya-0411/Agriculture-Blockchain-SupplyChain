import { Sprout, CheckCircle, DollarSign, Shield, QrCode, Facebook, Twitter, Instagram, Linkedin, Menu } from "lucide-react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import FarmerDashboard from "./FarmerDashboard";
import TrackProduct from "./TrackProduct";

import "./App.css";

function App() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (

    <div className="app">

      {/* Routes */}
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={
          <>

            {/* Navigation (ONLY FOR HOME) */}
            <nav className="navbar">

              <div className="nav-container">

                <div className="logo">
                  <Sprout />
                  <span>AgriChain</span>
                </div>

                <div className="nav-links">
                  <a href="#home">Home</a>
                  <a href="#about">About</a>
                  <a href="#features">Features</a>
                  <a href="#contact">Contact</a>
                </div>

                <div className="nav-buttons">

                  <Link to="/login">
                    <button className="login-btn">Login</button>
                  </Link>

                  <Link to="/register">
                    <button className="register-btn">Register</button>
                  </Link>

                </div>

                <button
                  className="mobile-menu-btn"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu />
                </button>

              </div>

              {mobileMenuOpen && (
                <div className="mobile-menu">

                  <a href="#home">Home</a>
                  <a href="#about">About</a>
                  <a href="#features">Features</a>
                  <a href="#contact">Contact</a>

                  <Link to="/login">
                    <button className="login-btn">Login</button>
                  </Link>

                  <Link to="/register">
                    <button className="register-btn">Register</button>
                  </Link>

                </div>
              )}

            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">

              <div className="hero-container">

                <div className="hero-text">

                  <h1>
                    Transparent Agricultural Supply Chain using Technology
                  </h1>

                  <p>
                    AgriChain connects farmers, distributors, retailers, and consumers
                    in a transparent network. Track every step of agricultural products
                    from farm to table.
                  </p>

                  <div className="hero-buttons">
                    <button className="primary-btn">Get Started</button>
                    <button className="secondary-btn">Learn More</button>
                  </div>

                </div>

                <div className="hero-image">
                  <img
                    src="https://images.unsplash.com/photo-1707286563398-7f97699cf29a"
                    alt="Agriculture"
                  />
                </div>

              </div>

            </section>


            {/* ABOUT SECTION */}
            <section id="about" className="about">

              <div className="about-container">

                <h2>About AgriChain</h2>

                <p>
                  AgriChain is a digital platform designed to bring transparency
                  and trust into the agricultural supply chain.
                </p>

                <p>
                  Farmers, distributors, retailers and consumers can track
                  products from farm to consumer using QR verification.
                </p>

              </div>

            </section>


            {/* FEATURES */}
            <section id="features" className="features">

              <h2>Platform Features</h2>

              <div className="features-grid">

                <div className="feature-card">
                  <CheckCircle />
                  <h3>Product Traceability</h3>
                  <p>Track products from farm to consumer.</p>
                </div>

                <div className="feature-card">
                  <DollarSign />
                  <h3>Transparent Pricing</h3>
                  <p>Farmers can see final retail price.</p>
                </div>

                <div className="feature-card">
                  <Shield />
                  <h3>Secure Data</h3>
                  <p>Data stored securely using blockchain.</p>
                </div>

                <div className="feature-card">
                  <QrCode />
                  <h3>QR Verification</h3>
                  <p>Scan QR code to verify product journey.</p>
                </div>

              </div>

            </section>


            {/* FOOTER */}
            <footer id="contact" className="footer">

              <div className="footer-container">

                <div>
                  <h2>AgriChain</h2>
                  <p>Transparent agricultural supply chain tracking.</p>
                </div>

                <div>
                  <h3>Contact</h3>
                  <p>Email: info@agrichain.com</p>
                  <p>Phone: +91 9876543210</p>
                </div>

                <div>
                  <h3>Follow Us</h3>
                  <div className="social-icons">
                    <Facebook />
                    <Twitter />
                    <Instagram />
                    <Linkedin />
                  </div>
                </div>

              </div>

              <p className="copyright">
                © {new Date().getFullYear()} AgriChain
              </p>

            </footer>

          </>
        } />

        {/* OTHER PAGES WITHOUT HEADER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/track/:id" element={<TrackProduct />} />


      </Routes>

    </div>

  );
}

export default App;