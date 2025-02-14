export class Ledger {
  private balance: number = 0;
  private transactionHistory: {
    type: string;
    amount: number;
    timestamp: string;
  }[] = [];

  // Record deposit or withdrawal transaction
  transaction(type: string, amount: number): void {
    if (type === "deposit") {
      this.balance += amount;
    } else if (type === "withdrawal") {
      if (this.balance < amount) {
        throw new Error("Insufficient balance");
      }
      this.balance -= amount;
    } else {
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
  getBalance(): number {
    return this.balance;
  }

  // Get transaction history
  getTransactionHistory(): {
    type: string;
    amount: number;
    timestamp: string;
  }[] {
    return this.transactionHistory;
  }
}
