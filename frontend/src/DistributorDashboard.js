import { useEffect, useState } from "react";
import "./DistributorDashboard.css";
import { useNavigate } from "react-router-dom";

function DistributorDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [processingCost, setProcessingCost] = useState("");
  const [distributorLocation, setDistributorLocation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products?status=farmer_shipment");
      const data = await res.json();
      if (Array.isArray(data)) {
        const filtered = data.filter((p) => {
          if (!p.cropType) return true;
          const type = p.cropType.toLowerCase();
          return type !== "vegetables" && type !== "fruits";
        });
        setProducts(filtered);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const handleProcessing = async () => {
    if (!selectedProduct) {
      alert("Select a product first");
      return;
    }
    if (!processingCost || !distributorLocation) {
      alert("Please enter both processing cost and distributor location");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setProcessing(true);
    try {
      const res = await fetch(`http://localhost:5000/api/distributor/process/${selectedProduct._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          processingCost: Number(processingCost) || 0,
          distributorLocation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Remove from local farmer products so it disappears from FarmerDashboard as well
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];
        const updatedLocal = localProducts.filter((p) => {
          // First try match by backend id
          if (p.id && selectedProduct._id && p.id === selectedProduct._id) {
            return false;
          }
          // Fallback: match by key fields for older entries without id
          const localCrop = (p.cropName || p.crop || "").toLowerCase();
          const backendCrop = (selectedProduct.crop || "").toLowerCase();
          const sameCrop = localCrop === backendCrop;
          const sameFarmer = p.farmerName === selectedProduct.farmerName;
          const sameQty = String(p.quantity) === String(selectedProduct.quantity);
          const sameLocation = p.location === selectedProduct.location;
          if (sameCrop && sameFarmer && sameQty && sameLocation) {
            return false;
          }
          return true;
        });
        localStorage.setItem("products", JSON.stringify(updatedLocal));

        alert("Product processed successfully");
        setSelectedProduct(null);
        setProcessingCost("");
        fetchProducts();
      } else {
        alert(data.message || "Failed to process");
      }
    } catch (err) {
      alert("Failed to connect to server");
    } finally {
      setProcessing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="distributor-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Distributor Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#c62828", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Logout
        </button>
      </div>
      <div className="section">
        <h2>Farmer Shipments (Grains & Pulses Only)</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.farmerName}</td>
                  <td>{product.crop}</td>
                  <td>{product.quantity} kg</td>
                  <td>{product.location}</td>
                  <td><button onClick={() => setSelectedProduct(product)}>Select</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && products.length === 0 && <p>No farmer shipments available.</p>}
      </div>
      <div className="section">
        <h2>Pre-Processing</h2>
        <input type="number" placeholder="Enter Processing Cost (₹)" value={processingCost} onChange={(e) => setProcessingCost(e.target.value)} />
        <input type="text" placeholder="Distributor Location" value={distributorLocation} onChange={(e) => setDistributorLocation(e.target.value)} />
        <button onClick={handleProcessing} disabled={processing}>{processing ? "Processing..." : "Process Product"}</button>
      </div>
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
