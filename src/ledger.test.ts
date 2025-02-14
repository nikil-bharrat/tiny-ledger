import { Ledger } from "./ledger";

describe("Ledger", () => {
  let ledger: Ledger;

  beforeEach(() => {
    ledger = new Ledger();
  });

  test("should initialize with a balance of 0", () => {
    expect(ledger.getBalance()).toBe(0);
  });

  test("should deposit funds correctly", () => {
    ledger.transaction("deposit", 100);
    expect(ledger.getBalance()).toBe(100);
  });

  test("should withdraw funds correctly", () => {
    ledger.transaction("deposit", 200);
    ledger.transaction("withdrawal", 50);
    expect(ledger.getBalance()).toBe(150);
  });

  test("should throw error for invalid transaction type", () => {
    expect(() => ledger.transaction("invalid", 100)).toThrow(
      "Transaction type must be 'deposit' or 'withdrawal'"
    );
  });

  test("should throw error for withdrawal amount greater than balance", () => {
    ledger.transaction("deposit", 50);
    expect(() => ledger.transaction("withdrawal", 100)).toThrow(
      "Insufficient balance"
    );
  });

  test("should record transactions in history", () => {
    ledger.transaction("deposit", 100);
    ledger.transaction("withdrawal", 50);

    const history = ledger.getTransactionHistory();
    expect(history.length).toBe(2);
    expect(history[0].type).toBe("deposit");
    expect(history[1].type).toBe("withdrawal");
  });
});
