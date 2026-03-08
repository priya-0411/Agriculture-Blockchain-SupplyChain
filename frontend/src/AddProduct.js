import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";

function AddProduct() {

  const navigate = useNavigate();

  const [farmerName, setFarmerName] = useState("");
  const [age, setAge] = useState("");
  const [cropType, setCropType] = useState("");
  const [cropName, setCropName] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [location, setLocation] = useState("");
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Lat:${lat}, Lon:${lon}`);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (harvestDate < today) {
      setError("Give correct date");
      return;
    }

    const token = localStorage.getItem("token");

    const productData = {
      farmerName,
      crop: cropName.toLowerCase(),
      cropType,
      harvestDate,
      location,
      qualityGrade: quality,
      pricePerKg: price,
      quantity,
      image,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await res.json();

      if (data.success) {
        // Also keep a local copy so FarmerDashboard & TrackProduct can display it
        const existing = JSON.parse(localStorage.getItem("products")) || [];
        existing.push({
          id: data.product?._id,
          farmerName,
          age,
          cropType,
          cropName,
          harvestDate,
          location,
          quality,
          price,
          quantity,
          image,
        });
        localStorage.setItem("products", JSON.stringify(existing));

        alert("Product added successfully");
        navigate("/farmer-dashboard");
      } else {
        alert(data.message || "Failed to add product");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add Crop Details</h2>
      {error && <p className="error-msg">{error}</p>}

      <form className="product-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Farmer Name"
          value={farmerName}
          onChange={(e) => setFarmerName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <select
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          required
        >
          <option value="">Select Crop Type</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Pulses</option>
          <option>Spices</option>
        </select>

        <input
          type="text"
          placeholder="Crop Name (Rice, Wheat, etc.)"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          required
        />

        <label>Harvest Date</label>
        <input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />

        <button type="button" onClick={getLocation}>
          Get Origin Location
        </button>

        <input
          type="text"
          value={location}
          placeholder="Origin Location (or type manually)"
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Quality Grade"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantity (kg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price per Kg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            if (file) reader.readAsDataURL(file);
          }}
          required
        />

        <button type="submit" className="submit-btn">
          Submit Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;