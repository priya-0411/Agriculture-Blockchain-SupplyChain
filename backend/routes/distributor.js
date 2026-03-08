const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// Process product (distributor only)
router.post("/process/:id", auth, async (req, res) => {
  try {
    const { processingCost, distributorLocation } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "farmer_shipment") {
      return res.status(400).json({ message: "Product already processed or sold" });
    }

    product.processingCost = Number(processingCost) || 0;
    if (distributorLocation) {
      product.distributorLocation = distributorLocation;
    }
    product.status = "distributor_processed";
    product.processedBy = req.user.id;
    await product.save();

    res.json({ success: true, message: "Product processed successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
