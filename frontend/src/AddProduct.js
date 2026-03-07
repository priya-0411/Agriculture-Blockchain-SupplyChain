import { useState } from "react";
import "./Farmer.css";

function AddProduct(){

 const [location,setLocation] = useState("");

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

 return(

  <div className="product-form-container">

    <h2>Add Crop Details</h2>

    <form className="product-form">

      <input type="text" placeholder="Farmer Name" required/>

      <input type="number" placeholder="Age" required/>

      <select required>

        <option value="">Select Crop Type</option>
        <option>Vegetables</option>
        <option>Fruits</option>
        <option>Grains</option>
        <option>Pulses</option>
        <option>Spices</option>

      </select>

      <input type="text" placeholder="Crop Name" required/>

      <label>Harvest Date</label>
      <input type="date" required/>

      <button type="button" onClick={getLocation}>
        Get Origin Location
      </button>

      <input 
        type="text" 
        value={location}
        placeholder="Origin Location"
        readOnly
      />

      <input type="text" placeholder="Quality Grade" required/>

      <input type="number" placeholder="Price per Kg" required/>

      <button type="submit" className="submit-btn">
        Submit Product
      </button>

    </form>

  </div>

 );
}

export default AddProduct;