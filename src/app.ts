import express from "express";
import { Ledger } from "./ledger";

export const app = express();
const port = 3000;

// Initialise ledger
const ledger = new Ledger();

app.use(express.json());

// Endpoint to record a deposit transaction
app.post("/transaction/deposit", (req: any, res: any) => {
  const { amount } = req.body;
  if (amount && amount > 0) {
    ledger.transaction("deposit", amount);
    return res
      .status(200)
      .json({ message: "Deposit successful", balance: ledger.getBalance() });
  }
  return res.status(400).json({ message: "Invalid deposit amount" });
});

// Endpoint to record a withdrawal transaction
app.post("/transaction/withdrawal", (req: any, res: any) => {
  const { amount } = req.body;
  if (amount && amount > 0) {
    if (ledger.getBalance() >= amount) {
      ledger.transaction("withdrawal", amount);
      return res.status(200).json({
        message: "Withdrawal successful",
        balance: ledger.getBalance(),
      });
    } else {
      return res.status(400).json({ message: "Insufficient balance" });
    }
  }
  return res.status(400).json({ message: "Invalid withdrawal amount" });
});

// Endpoint to view current balance
app.get("/balance", (req, res) => {
  const balance = ledger.getBalance();
  res.status(200).json({ balance });
});

// Endpoint to view transaction history (deposits, withdrawals etc..)
app.get("/transactions", (req, res) => {
  const transactions = ledger.getTransactionHistory();
  res.status(200).json({ transactions });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});