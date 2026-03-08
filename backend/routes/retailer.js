const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// Get products ready for retail (distributor_processed)
router.get("/products", auth, async (req, res) => {
  try {
    const products = await Product.find({ status: "distributor_processed" }).sort({ updatedAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Purchase product (mark as retailer_purchased)
router.post("/purchase/:id", auth, async (req, res) => {
  try {
    const { retailerLocation, retailPricePerKg } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "distributor_processed") {
      return res.status(400).json({ message: "Product not available for purchase" });
    }

    product.status = "retailer_purchased";
    if (retailerLocation) {
      product.retailerLocation = retailerLocation;
    }
    if (retailPricePerKg) {
      product.retailPricePerKg = Number(retailPricePerKg);
    }
    await product.save();

    res.json({ success: true, message: "Product purchased successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
