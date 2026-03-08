import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function TrackProduct() {

  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const viewer = searchParams.get("viewer") || "consumer";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id || "");

    const load = async () => {
      try {
        if (isObjectId) {
          const res = await fetch(`http://localhost:5000/api/products/${id}`);
          const data = await res.json();
          if (data.success) {
            setProduct(data.product);
          } else {
            setProduct(null);
          }
        } else {
          const products = JSON.parse(localStorage.getItem("products")) || [];
          const selectedProduct = products[parseInt(id, 10)];
          setProduct(selectedProduct || null);
        }
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading product...
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found
      </h2>
    );
  }

  const cropType = (product.cropType || product.crop_type || "").toLowerCase();
  const isVegOrFruit = cropType === "vegetables" || cropType === "fruits";

  const image = product.image;
  const cropName = product.cropName || product.crop;
  const farmerPrice = Number(product.price || product.pricePerKg || 0);
  const quality = product.quality || product.qualityGrade;
  const quantity = Number(product.quantity || 0);
  const processingCost = Number(product.processingCost || 0);
  const retailerLocation = product.retailerLocation;
  const retailPricePerKg = Number(product.retailPricePerKg || 0);

  let currentPricePerKg = farmerPrice;
  if (quantity > 0 && processingCost > 0) {
    currentPricePerKg = farmerPrice + processingCost / quantity;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e8f5e9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          width: "380px",
          textAlign: "left",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ color: "#2e7d32", textAlign: "center", marginBottom: 16 }}>Product Traceability</h2>

        {image && (
        <img
          src={image}
          alt="crop"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: 16,
          }}
        />
        )}

        <h3 style={{ marginBottom: 8, textAlign: "center" }}>{cropName}</h3>

        {/* Farmer section */}
        <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: "#f1f8e9" }}>
          <h4 style={{ margin: 0, marginBottom: 8, color: "#558b2f" }}>Farmer Details</h4>
          <p><b>Farmer:</b> {product.farmerName}</p>
          {product.age && <p><b>Age:</b> {product.age}</p>}
          <p><b>Origin Location:</b> {product.location}</p>
          <p><b>Crop Type:</b> {product.cropType}</p>
          <p><b>Harvest Date:</b> {product.harvestDate}</p>
          <p><b>Quality:</b> {quality}</p>
          <p><b>Quantity:</b> {product.quantity} kg</p>
          <p><b>Farmer price when sold:</b> ₹{farmerPrice.toFixed(2)}/kg</p>
        </div>

        {/* Distributor section */}
        {(processingCost > 0 || product.distributorLocation) && (
          <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: "#e3f2fd" }}>
            <h4 style={{ margin: 0, marginBottom: 8, color: "#1565c0" }}>Distributor Stage</h4>
            {product.distributorLocation && <p><b>Distributor location:</b> {product.distributorLocation}</p>}
            {processingCost > 0 && quantity > 0 && (
              <p>
                <b>Processing cost:</b> ₹{processingCost.toFixed(2)} total
                {" "}(~₹{(processingCost / quantity).toFixed(2)}/kg)
              </p>
            )}
          </div>
        )}

        {/* Retailer section (only extra detail for retailer view) */}
        {viewer === "retailer" && (retailerLocation || retailPricePerKg) && (
          <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: "#fff3e0" }}>
            <h4 style={{ margin: 0, marginBottom: 8, color: "#ef6c00" }}>Retailer Stage</h4>
            {retailerLocation && <p><b>Store location:</b> {retailerLocation}</p>}
            {retailPricePerKg > 0 && (
              <p><b>Retail price:</b> ₹{retailPricePerKg.toFixed(2)}/kg</p>
            )}
            <p style={{ marginTop: 8, fontSize: 12, color: "#6d4c41" }}>
              (This section is visible via the retailer QR only.)
            </p>
          </div>
        )}

        {/* For retailer, optionally show computed current price */}
        {viewer === "retailer" && quantity > 0 && processingCost > 0 && (
          <div style={{ marginBottom: 16, padding: 10, borderRadius: 8, background: "#fbe9e7" }}>
            <p style={{ margin: 0 }}>
              <b>Estimated blended cost:</b> ₹{currentPricePerKg.toFixed(2)}/kg
            </p>
          </div>
        )}

        <h4 style={{ marginTop: 8, marginBottom: 4, textAlign: "center" }}>Supply Chain Path</h4>

        <p style={{ textAlign: "center" }}>
          {isVegOrFruit
            ? "🌾 Farm → 🏪 Retailer → 🛒 Consumer"
            : "🌾 Farm → 📦 Distributor → 🏪 Retailer → 🛒 Consumer"}
        </p>
      </div>
    </div>
  );
}

export default TrackProduct;
