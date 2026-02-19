import express from "express";
import cors from "cors";
import "dotenv/config";
import { ethers } from "ethers";
import InvoiceNFTAbi from "./InvoiceNFTAbi.js";

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC);

console.log("Using contract:", process.env.CONTRACT_ADDRESS);


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

    if (!receipt) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // ✅ PROFESSIONAL ERC721 LOG DECODER (robust)
    const iface = new ethers.Interface([
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
    ]);

    let tokenId = null;

    for (const log of receipt.logs) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed && parsed.name === "Transfer") {
          tokenId = parsed.args.tokenId.toString();
          break;
        }
      } catch (e) {
        // ignore non‑transfer logs
      }
    }

    if (!tokenId) {
      return res.status(404).json({ error: "No NFT Transfer found in tx" });
    }

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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Validator backend running on", process.env.PORT)
);
