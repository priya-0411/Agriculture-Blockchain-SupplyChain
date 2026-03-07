import { useNavigate } from "react-router-dom";
import "./Farmer.css";

function FarmerDashboard(){

 const navigate = useNavigate();

 return(

  <div className="farmer-dashboard">

    <h2>Farmer Dashboard</h2>

    <button 
      className="add-product-btn"
      onClick={()=>navigate("/add-product")}
    >
      Add Product
    </button>

  </div>

 );
}

export default FarmerDashboard;