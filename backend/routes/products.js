const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// Create product (farmer only)
router.post("/", auth, async (req, res) => {
  try {
    const { farmerName, crop, cropType, quantity, location, harvestDate, qualityGrade, pricePerKg, image } = req.body;

    if (!farmerName || !crop || !cropType || !quantity || !location || !harvestDate || !qualityGrade || !pricePerKg) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      farmer: req.user.id,
      farmerName,
      crop,
      cropType,
      quantity: Number(quantity),
      location,
      harvestDate,
      qualityGrade,
      pricePerKg: Number(pricePerKg),
      image,
      status: "farmer_shipment"
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products (optionally filter by status)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get farmer's own products
router.get("/my-products", auth, async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
