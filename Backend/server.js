import express from "express";
import cors from "cors";
import "dotenv/config";
import { ethers } from "ethers";
import InvoiceNFTAbi from "./InvoiceNFTAbi.js";

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  InvoiceNFTAbi,
  provider
);

// 🔎 VERIFY USING TXHASH (BLOCKCHAIN ONLY)
app.get("/api/verify/:txHash", async (req, res) => {
  try {
    const { txHash } = req.params;

    const receipt = await provider.getTransactionReceipt(txHash);

    console.log("receipt:", receipt);
    console.log("logs:", receipt.logs);

    if (!receipt) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // extract tokenId from Transfer event
   const transferTopic = ethers.id("Transfer(address,address,uint256)");

const transferLog = receipt.logs.find(
  (log) =>
    log.topics &&
    log.topics.length > 0 &&
    log.topics[0].toLowerCase() === transferTopic.toLowerCase()
);

if (!transferLog) {
  console.log("No ERC721 Transfer event found");
  return res.status(404).json({ error: "NFT Transfer event not found" });
}


    const tokenId = ethers.getBigInt(transferLog.topics[3]).toString();

    const data = await contract.invoices(tokenId);

    res.json({
      tokenId,
      invoiceNumber: data.invoiceNumber,
      amount: data.amount.toString(),
      generatorName: data.generatorName,
      billedTo: data.billedTo,
      date: data.date,
      invoiceHash: data.invoiceHash
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Validator backend running on", process.env.PORT)
);
