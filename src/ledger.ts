export class Account {
  private id: string;
  private balance: number = 0;

  constructor(id: string, balance: number = 0) {
    this.id = id;
    this.balance = balance;
  }
}

export class Ledger {
  private accounts: Account[];
  
  private balance: number = 0;
  private transactionHistory: {
    type: string;
    amount: number;
    timestamp: string;
  }[] = [];

  constructor(accounts: Account[], initialBalance = 0) {
    this.accounts = accounts;
    this.balance = initialBalance;
  }


  // Record deposit or withdrawal transaction
  transaction(type: TransactionType, amount: number, accountFrom?: Account, accountTo?: Account): void {
    if (type === "deposit") {
      this.balance += amount;
    } else if (type === "withdrawal") {
      if (this.balance < amount) {
        throw new Error("Insufficient balance");
      }
      this.balance -= amount;
    } 
    else if (type === "transfer") {
      accountFrom.balance -= amount;
      accountTo.balance += amount;
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

type TransactionType = "deposit" | "withdrawal" | "transfer";