"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ledger = void 0;
class Ledger {
    constructor() {
        this.balance = 0;
        this.transactionHistory = [];
    }
    // Record deposit or withdrawal transaction
    transaction(type, amount) {
        if (type === "deposit") {
            this.balance += amount;
        }
        else if (type === "withdrawal") {
            if (this.balance < amount) {
                throw new Error("Insufficient balance");
            }
            this.balance -= amount;
        }
        else {
            throw new Error("Transaction type must be 'deposit' or 'withdrawal'");
        }
        // Record the transaction with timestamp
        this.transactionHistory.push({
            type,
            amount,
            timestamp: new Date().toISOString(),
        });
    }
    // Get current balance
    getBalance() {
        return this.balance;
    }
    // Get transaction history
    getTransactionHistory() {
        return this.transactionHistory;
    }
}
exports.Ledger = Ledger;
