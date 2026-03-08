const axios = require("axios");

const PINATA_BASE_URL = "https://api.pinata.cloud";

const pinataClient = axios.create({
  baseURL: PINATA_BASE_URL,
  headers: {
    pinata_api_key: process.env.PINATA_API_KEY || "",
    pinata_secret_api_key: process.env.PINATA_SECRET_KEY || "",
  },
});

async function pinJSONToIPFS(data) {
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
    throw new Error("Pinata API keys are not configured in .env");
  }

  const res = await pinataClient.post("/pinning/pinJSONToIPFS", data);
  return res.data; // { IpfsHash, PinSize, Timestamp }
}

module.exports = { pinJSONToIPFS };

