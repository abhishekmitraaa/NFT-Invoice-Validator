const InvoiceNFTAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "merchant", "type": "address" },
      { "internalType": "string", "name": "invoiceNumber", "type": "string" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "string", "name": "generatorName", "type": "string" },
      { "internalType": "string", "name": "billedTo", "type": "string" },
      { "internalType": "string", "name": "date", "type": "string" },
      { "internalType": "string", "name": "invoiceHash", "type": "string" }
    ],
    "name": "mintInvoiceNFT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "name":"invoices",
    "outputs":[
      {"internalType":"string","name":"invoiceNumber","type":"string"},
      {"internalType":"uint256","name":"amount","type":"uint256"},
      {"internalType":"string","name":"generatorName","type":"string"},
      {"internalType":"string","name":"billedTo","type":"string"},
      {"internalType":"string","name":"date","type":"string"},
      {"internalType":"string","name":"invoiceHash","type":"string"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];

export default InvoiceNFTAbi;
