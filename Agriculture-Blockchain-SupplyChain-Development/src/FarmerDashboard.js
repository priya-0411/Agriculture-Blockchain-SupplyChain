import React, { useEffect, useState } from "react";
import "./Farmer.css";

function FarmerDashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("farmerProducts")) || [];
    setProducts(storedProducts);
  }, []);

  // Delete product function
  const handleDelete = (index) => {

    const updatedProducts = products.filter(
      (_, i) => i !== index
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "farmerProducts",
      JSON.stringify(updatedProducts)
    );
  };

  return (
    <div className="farmer-dashboard">

      <div className="dashboard-header">

        <img
          src="https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlMTJfcGhvdG9fb2ZfYW5faW5kaWFuX2Zhcm1lcl9kb2luZ19hZ3JpY3VsdHVyZV9zbV84M2Y5ODI4MC05MGFlLTRmZTEtOWQ3NS0xMjM4MWI5MTMxZjZfMS5qcGc.jpg"
          className="farmer-img"
          alt="farmer"
        />

        <h1 className="dashboard-title">Farmer Dashboard</h1>

        <a href="/add-product">
          <button className="add-product-btn">
            Add Product
          </button>
        </a>

      </div>

      <h2 className="product-heading">Your Products</h2>

      <div className="product-container">

        {products.map((product, index) => (

          <div className="product-card-dashboard" key={index}>

            <h3 className="crop-title">{product.cropName}</h3>

            <div className="product-details">

              <div className="detail-row">
                <span className="label">Farmer</span>
                <span className="value">{product.farmerName}</span>
              </div>

              <div className="detail-row">
                <span className="label">Age</span>
                <span className="value">{product.age}</span>
              </div>

              <div className="detail-row">
                <span className="label">Crop Type</span>
                <span className="value">{product.cropType}</span>
              </div>

              <div className="detail-row">
                <span className="label">Harvest Date</span>
                <span className="value">{product.date}</span>
              </div>

              <div className="detail-row">
                <span className="label">Location</span>
                <span className="value">{product.location}</span>
              </div>

              <div className="detail-row">
                <span className="label">Quality</span>
                <span className="value">{product.quality}</span>
              </div>

            </div>

            <p className="price">₹{product.price}/Kg</p>

            {/* Delete Button */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FarmerDashboard;