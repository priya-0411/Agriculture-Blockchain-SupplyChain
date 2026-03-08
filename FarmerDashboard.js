import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Farmer.css";

function FarmerDashboard(){

 const navigate = useNavigate();
 const [products,setProducts] = useState([]);

 useEffect(()=>{

  const storedProducts =
  JSON.parse(localStorage.getItem("products")) || [];

  setProducts(storedProducts);

 },[]);

 const deleteProduct = (index)=>{

  const updatedProducts =
  products.filter((_,i)=>i !== index);

  setProducts(updatedProducts);

  localStorage.setItem(
   "products",
   JSON.stringify(updatedProducts)
  );
 };

 return(

  <div className="farmer-dashboard">

    <div className="dashboard-header">

      <img
       src="https://www.shutterstock.com/image-photo/indian-farmer-harvesting-paddy-happy-260nw-2510944615.jpg"
       alt="farmer"
       className="farmer-img"
      />

      <h2 className="dashboard-title">Farmer Dashboard</h2>

      <button
       className="add-product-btn"
       onClick={()=>navigate("/add-product")}
      >
       Add Product
      </button>

    </div>


    <div className="product-grid">

      {products.map((p,index)=>(

       <div key={index} className="product-card">

        <img
         src={p.image}
         alt="crop"
         className="crop-img"
        />

        <h3>{p.cropName}</h3>

        <p><b>Farmer:</b> {p.farmerName}</p>
        <p><b>Age:</b> {p.age}</p>
        <p><b>Type:</b> {p.cropType}</p>
        <p><b>Harvest:</b> {p.harvestDate}</p>
        <p><b>Price:</b> ₹{p.price}/kg</p>

        <div className="qr-section">

          {/*
          <QRCodeCanvas
           value={`${p.cropName}-${p.farmerName}-${p.location}`}
           size={70}
          />
          */}
          {/*
          <QRCodeCanvas
              value={`http://192.168.1.5:3000/track/${index}`}
            
              size={70}
          />
          */}
          {/*
          <QRCodeCanvas
            value={`http://localhost:3000/track/${index}`}
            size={70}
          />
          {/*value={`http://10.203.91.96:3000/track/${index}`}*/}

  <div className="qr-box">

    <QRCodeCanvas
        value={`http://localhost:3000/track/${index}`}
        size={110}
        bgColor={"#ffffff"}
        fgColor={"#2e7d32"}
        level={"H"}
        includeMargin={true}
      />

      <p className="qr-text">
       Scan to Trace Product
      </p>

    </div>


        </div>

        <div className="card-buttons">

          <button className="track-btn" onClick={() => navigate(`/track/${index}`)}>
            Track Product
          </button>

          <button
           className="delete-btn"
           onClick={()=>deleteProduct(index)}
          >
           Delete
          </button>

        </div>

       </div>

      ))}

    </div>

  </div>

 );
}

export default FarmerDashboard;