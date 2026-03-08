import { useEffect, useState } from "react";
import "./DistributorDashboard.css";

function DistributorDashboard() {

  const [products,setProducts] = useState([]);
  const [processingCost,setProcessingCost] = useState("");
  const [selectedProduct,setSelectedProduct] = useState(null);

  // Allowed categories
  const allowedCategories = [
    "rice",
    "wheat",
    "maize",
    "millet",
    "lentils",
    "chickpea",
    "pigeon pea",
    "green gram",
    "black gram"
  ];

  useEffect(() => {

    const fetchProducts = async () => {

      try{

        const res = await fetch("http://localhost:5000/products");

        const data = await res.json();

        // Filter only grains & pulses
        const filteredProducts = data.filter((product)=>
          allowedCategories.includes(product.crop.toLowerCase())
        );

        setProducts(filteredProducts);

      }catch(error){
        console.log(error);
      }

    };

    fetchProducts();

  },[]);


  const handleProcessing = async () => {

    if(!selectedProduct){
      alert("Select a product first");
      return;
    }

    try{

      await fetch(`http://localhost:5000/distributor/process/${selectedProduct._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          processingCost:processingCost
        })
      });

      alert("Product processed successfully");

    }catch(error){
      console.log(error);
    }

  };


  return(

    <div className="distributor-container">

      <h1>Distributor Dashboard</h1>

      {/* Incoming Farmer Products */}

      <div className="section">

        <h2>Farmer Shipments (Grains & Pulses Only)</h2>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Farmer</th>
              <th>Crop</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Select</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product)=>(
              <tr key={product._id}>

                <td>{product._id}</td>
                <td>{product.farmerName}</td>
                <td>{product.crop}</td>
                <td>{product.quantity} kg</td>
                <td>{product.location}</td>

                <td>
                  <button
                    onClick={()=>setSelectedProduct(product)}
                  >
                    Select
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>


      {/* Processing Section */}

      <div className="section">

        <h2>Pre-Processing</h2>

        <input
          type="number"
          placeholder="Enter Processing Cost"
          value={processingCost}
          onChange={(e)=>setProcessingCost(e.target.value)}
        />

        <button onClick={handleProcessing}>
          Process Product
        </button>

      </div>


      {/* Selected Product */}

      {selectedProduct && (

        <div className="section">

          <h2>Selected Product</h2>

          <p><b>Crop:</b> {selectedProduct.crop}</p>
          <p><b>Farmer:</b> {selectedProduct.farmerName}</p>
          <p><b>Quantity:</b> {selectedProduct.quantity} kg</p>

        </div>

      )}

    </div>

  );

}

export default DistributorDashboard;