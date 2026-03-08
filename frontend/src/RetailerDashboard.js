import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./RetailerDashboard.css";

function RetailerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeLocation, setStoreLocation] = useState("");
  const [retailPricePerKg, setRetailPricePerKg] = useState("");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/retailer/products", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
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

  const handlePurchase = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!storeLocation || !retailPricePerKg) {
      alert("Please enter store location and retail price per kg before purchasing.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/retailer/purchase/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          retailerLocation: storeLocation,
          retailPricePerKg,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Product purchased successfully");
        fetchProducts();
      } else {
        alert(data.message || "Failed to purchase");
      }
    } catch (err) {
      alert("Failed to connect to server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="retailer-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <h1>Retailer Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className="section">
        <h2>Processed Products (Ready for Retail)</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Store / Retailer Location"
            value={storeLocation}
            onChange={(e) => setStoreLocation(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <input
            type="number"
            placeholder="Retail Price per Kg (₹)"
            value={retailPricePerKg}
            onChange={(e) => setRetailPricePerKg(e.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No processed products available yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Farmer</th>
                <th>Quantity</th>
                <th>Processing Cost</th>
                <th>Farmer Price/Kg</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const consumerUrl = `${window.location.origin}/track/${p._id}`;
                const retailerUrl = `${window.location.origin}/track/${p._id}?viewer=retailer`;
                return (
                <tr key={p._id}>
                  <td>{p.crop}</td>
                  <td>{p.farmerName}</td>
                  <td>{p.quantity} kg</td>
                  <td>₹{p.processingCost}</td>
                  <td>₹{p.pricePerKg}</td>
                  <td>
                    <button onClick={() => handlePurchase(p._id)}>Purchase</button>
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <div>
                        <small>Retailer QR</small>
                        <QRCodeCanvas value={retailerUrl} size={64} />
                      </div>
                      <div>
                        <small>Consumer QR</small>
                        <QRCodeCanvas value={consumerUrl} size={64} />
                      </div>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RetailerDashboard;
