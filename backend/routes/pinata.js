const express = require("express");
const router = express.Router();
const { pinJSONToIPFS } = require("../services/pinata");
const { storeCIDOnChain } = require("../services/blockchain");

// POST /api/pinata/upload
// Body: arbitrary JSON (e.g. product traceability metadata)
router.post("/upload", async (req, res) => {
  try {
    const payload = req.body || {};

    // 1) Upload JSON to Pinata
    const pinRes = await pinJSONToIPFS({
      pinataContent: payload,
    });

    const cid = pinRes.IpfsHash;

    // 2) Store CID on-chain
    const chainRes = await storeCIDOnChain(cid);

    res.json({
      success: true,
      cid,
      txHash: chainRes.txHash,
      blockNumber: chainRes.blockNumber,
      pinata: pinRes,
    });
  } catch (error) {
    console.error("Pinata/Blockchain upload error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload to Pinata / blockchain",
    });
  }
});

module.exports = router;

