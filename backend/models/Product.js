const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  cropType: {
    type: String,
    enum: ["Vegetables", "Fruits", "Grains", "Pulses", "Spices"],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  qualityGrade: {
    type: String,
    required: true
  },
  pricePerKg: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  distributorLocation: {
    type: String
  },
  retailerLocation: {
    type: String
  },
  retailPricePerKg: {
    type: Number
  },
  status: {
    type: String,
    enum: ["farmer_shipment", "distributor_processed", "retailer_purchased"],
    default: "farmer_shipment"
  },
  processingCost: {
    type: Number,
    default: 0
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
