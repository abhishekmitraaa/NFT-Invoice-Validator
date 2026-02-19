# 🧾 NFT Invoice Validator — Polygon Web3 Verification

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61dafb)
![NodeJS](https://img.shields.io/badge/Backend-NodeJS-green)
![Polygon](https://img.shields.io/badge/Network-Polygon%20Amoy-purple)
![Web3](https://img.shields.io/badge/Web3-ethers.js-orange)

A modern Web3 verification platform that validates NFT‑based invoices directly from the Polygon Amoy blockchain using only a Transaction Hash.

⚡ **No database required**  
🔐 **Fully on‑chain verification**  
🧠 **Smart‑contract driven validation**

---

# ✨ Features

- ✅ Validate NFT invoices using TxHash
- 🔗 Reads invoice data directly from blockchain
- 🪙 ERC‑721 Transfer event decoding
- 🎨 Modern Web3 UI (React + TailwindCSS)
- ⚡ Fast verification via ethers.js
- 🌐 Polygon Amoy Testnet support
- 🔒 Read‑only blockchain access

---

# 🧱 System Architecture

```
User Browser
      ↓
React Frontend (Validator UI)
      ↓
Node.js Express Backend API
      ↓
Polygon Amoy RPC Provider
      ↓
InvoiceNFT Smart Contract
```

---

# 🛠 Tech Stack

## Frontend
- React (Vite)
- TailwindCSS
- Axios

## Backend
- Node.js
- Express
- ethers.js v6
- dotenv
- cors

## Blockchain
- Solidity ERC721
- Polygon Amoy Testnet

---

# 📂 Project Structure

```
NFT Validator/
 ├── Backend/
 │     ├── server.js
 │     ├── InvoiceNFTAbi.js
 │     └── .env
 │
 └── frontend/
       ├── src/
       │    └── App.jsx
       └── package.json
```

---

# ⚙️ Environment Setup

Create a `.env` file inside **Backend/**:

```
PORT=5000
TESTNET_RPC=YOUR_AMOY_RPC_URL
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT
```

Example RPC Providers:

- Alchemy
- Infura
- QuickNode

---

# 🚀 How To Run The Validator Website

## 1️⃣ Start Backend API

```bash
cd Backend
npm install
node server.js
```

Expected Output:

```
Validator backend running on 5000
```

---

## 2️⃣ Start Frontend Website

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

# 🔎 How To Use The Website

1. Mint an Invoice NFT from your backend system.
2. Copy the **Transaction Hash** from Polygon Amoy.
3. Paste the TxHash into the validator website input.
4. Click **Validate On‑Chain**.
5. The validator fetches NFT data directly from blockchain and displays:

- Invoice Number
- Amount
- Generator Name
- Billed To
- Date
- Invoice Hash

---

# 🔗 API Endpoint

```
GET /api/verify/:txHash
```

Example:

```
http://localhost:5000/api/verify/0x1234...
```

---

# 🧠 Validation Flow

### Step 1 — Fetch Transaction Receipt

```js
provider.getTransactionReceipt(txHash)
```

### Step 2 — Decode ERC721 Transfer Event

```
Transfer(address,address,uint256 tokenId)
```

### Step 3 — Read Invoice Metadata

```js
contract.invoices(tokenId)
```

---

# 📊 Example Response

```json
{
  "tokenId": "2",
  "invoiceNumber": "INV-100",
  "amount": "2500",
  "generatorName": "Demo Store",
  "billedTo": "Test User",
  "date": "2026-02-19",
  "invoiceHash": "0xabc..."
}
```

---

# 🎨 UI Highlights

- 🌌 Dark Web3 Gradient Theme
- 🪟 Glassmorphism Card Design
- ✅ VALID ON‑CHAIN Badge
- 🔗 Polygonscan Transaction Link
- 📱 Responsive Layout

---

# ⚠️ Troubleshooting

### ❌ NFT Not Found
- Check CONTRACT_ADDRESS matches Polygonscan
- Ensure TESTNET_RPC is Polygon Amoy
- Confirm TxHash is full 66 characters

### ❌ Transaction Not Found
- Wrong network RPC
- Tx not confirmed yet

---

# 🔐 Security

- No private keys required
- Read‑only blockchain access
- Smart contract is source of truth

---

# 📈 Future Improvements

- WalletConnect support
- QR code invoice scanning
- IPFS metadata integration
- Network auto detection
- Animated Web3 loading states

---

# 📜 License

Licensed under the **Apache License 2.0**.

See the `LICENSE` file for details.

---

# 👨‍💻 Author
Abhishek Mitra

NFT Invoice Validator  
Built for Web3 Invoice Verification on Polygon.
