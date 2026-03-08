import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TrackProduct() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const products =
      JSON.parse(localStorage.getItem("products")) || [];

    const selectedProduct = products[id];

    setProduct(selectedProduct);

  }, [id]);

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found
      </h2>
    );
  }

  // supply chain logic
  const type = product.cropType?.toLowerCase();

  const isVegOrFruit =
    type === "vegetables" || type === "fruits";

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
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2 style={{ color: "#2e7d32" }}>
          Product Traceability
        </h2>

        <img
          src={product.image}
          alt="crop"
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <h3>{product.cropName}</h3>

        <p><b>Farmer:</b> {product.farmerName}</p>
        <p><b>Age:</b> {product.age}</p>
        <p><b>Location:</b> {product.location}</p>
        <p><b>Crop Type:</b> {product.cropType}</p>
        <p><b>Harvest Date:</b> {product.harvestDate}</p>
        <p><b>Quality:</b> {product.quality}</p>
        <p><b>Price:</b> ₹{product.price}/kg</p>

        <hr />

        <h4>Supply Chain</h4>

        {isVegOrFruit ? (

          <p>
            🌾 Farm → 🏪 Retailer → 🛒 Consumer
          </p>

        ) : (

          <p>
            🌾 Farm → 📦 Distributor → 🏪 Retailer → 🛒 Consumer
          </p>

        )}

      </div>

    </div>

  );
}

export default TrackProduct;