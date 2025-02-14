"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const ledger_1 = require("./ledger");
exports.app = (0, express_1.default)();
const port = 3000;
// Initialise ledger
const ledger = new ledger_1.Ledger();
exports.app.use(express_1.default.json());
// Endpoint to record a deposit transaction
exports.app.post("/transaction/deposit", (req, res) => {
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
exports.app.post("/transaction/withdrawal", (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        if (ledger.getBalance() >= amount) {
            ledger.transaction("withdrawal", amount);
            return res.status(200).json({
                message: "Withdrawal successful",
                balance: ledger.getBalance(),
            });
        }
        else {
            return res.status(400).json({ message: "Insufficient balance" });
        }
    }
    return res.status(400).json({ message: "Invalid withdrawal amount" });
});
// Endpoint to view current balance
exports.app.get("/balance", (req, res) => {
    const balance = ledger.getBalance();
    res.status(200).json({ balance });
});
// Endpoint to view transaction history (deposits, withdrawals etc..)
exports.app.get("/transactions", (req, res) => {
    const transactions = ledger.getTransactionHistory();
    res.status(200).json({ transactions });
});
// Start server
exports.app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
