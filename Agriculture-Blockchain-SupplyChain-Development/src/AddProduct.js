import { useState } from "react";
import "./Farmer.css";
import { useNavigate } from "react-router-dom";

function AddProduct(){

 const navigate = useNavigate();

 const [location,setLocation] = useState("");
 const [error,setError] = useState("");

 const [product,setProduct] = useState({
  farmerName:"",
  age:"",
  cropType:"",
  cropName:"",
  date:"",
  quality:"",
  price:""
 });

 const today = new Date().toISOString().split("T")[0];

 const getLocation = () =>{
  
  if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition((position)=>{

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLocation(`Lat: ${lat} , Lon: ${lon}`);

    });

  }
  else{
    alert("Location not supported");
  }
 };

 const handleChange = (e)=>{
  setProduct({...product,[e.target.name]:e.target.value});
 };

 const handleSubmit = (e)=>{
  e.preventDefault();

  if(product.date < today){
    setError("Give correct date");
    return;
  }

  const storedProducts =
   JSON.parse(localStorage.getItem("farmerProducts")) || [];

  const newProduct = {...product,location};

  storedProducts.push(newProduct);

  localStorage.setItem(
    "farmerProducts",
    JSON.stringify(storedProducts)
  );

  navigate("/farmer-dashboard");
 };

 return(

  <div className="product-page">

    <div className="product-card">

      <h2>Add Crop Details</h2>

      <form className="product-form" onSubmit={handleSubmit}>

        <input
         type="text"
         name="farmerName"
         placeholder="Farmer Name"
         onChange={handleChange}
         required
        />

        <input
         type="number"
         name="age"
         placeholder="Age"
         onChange={handleChange}
         required
        />

        <select
         name="cropType"
         onChange={handleChange}
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
         name="cropName"
         placeholder="Crop Name"
         onChange={handleChange}
         required
        />

        <label>Harvest Date</label>

        <input
         type="date"
         name="date"
         min={today}
         onChange={handleChange}
         required
        />

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={getLocation}>
          Get Origin Location
        </button>

        <input
          type="text"
          value={location}
          placeholder="Origin Location"
          readOnly
        />

        <input
         type="text"
         name="quality"
         placeholder="Quality Grade"
         onChange={handleChange}
         required
        />

        <input
         type="number"
         name="price"
         placeholder="Price per Kg"
         onChange={handleChange}
         required
        />

        <button type="submit" className="submit-btn">
          Submit Product
        </button>

      </form>

    </div>

  </div>

 );
}

export default AddProduct;