const { ethers } = require("ethers");
const path = require("path");

let contract;

function getContract() {
  if (contract) return contract;

  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!rpcUrl || !privateKey || !contractAddress) {
    throw new Error("Blockchain env vars (RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS) are not configured");
  }

  // Load ABI from a JSON file that the user will provide
  // e.g. backend/contractABI.json
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const abiPath = path.join(__dirname, "..", "contractABI.json");
  // This will throw if file is missing; that's fine as a clear error.
  const abi = require(abiPath);

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  contract = new ethers.Contract(contractAddress, abi, wallet);
  return contract;
}

async function storeCIDOnChain(cid) {
  const c = getContract();
  // Assumes contract has a function `storeCID(string cid)`
  const tx = await c.storeCID(cid);
  const receipt = await tx.wait();
  return {
    txHash: tx.hash,
    blockNumber: receipt.blockNumber,
  };
}

module.exports = { storeCIDOnChain };

