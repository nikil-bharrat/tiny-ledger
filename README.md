# Simple Ledger

## Requirements

- Node.js
- npm or yarn

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npx tsc` to compile TypeScript files.
4. Run `node dist/app.js` to start the server.

## API Endpoints

### 1. Deposit Money

**POST** `/transaction/deposit`

- Request body: `{ "amount": number }`
- Response: `{ "message": "Deposit successful", "balance": number }`

### 2. Withdraw Money

**POST** `/transaction/withdrawal`

- Request body: `{ "amount": number }`
- Response: `{ "message": "Withdrawal successful", "balance": number }`

### 3. Get Current Balance

**GET** `/balance`

- Response: `{ "balance": number }`

### 4. Get Transaction History

**GET** `/transactions`

- Response:
  ```json
  {
    "transactions": [
      { "type": "deposit", "amount": number, "timestamp": "ISO Date" },
      { "type": "withdrawal", "amount": number, "timestamp": "ISO Date" }
    ]
  }
  ```

## Example Calls

### 1. Deposit Money

**POST** `/transaction/deposit`

- `curl -X POST -H "Content-Type: application/json" -d '{"amount": 100}' http://localhost:3000/transaction/deposit`
- Response: `{ "message": "Deposit successful", "balance": 100 }`

### 2. Withdraw Money

**POST** `/transaction/withdrawal`

- `curl -X POST -H "Content-Type: application/json" -d '{"amount": 50}' http://localhost:3000/transaction/withdrawal`
- Response: `{ "message": "Withdrawal successful", "balance": 50 }`

### 3. Get Current Balance

**GET** `/balance`

- `curl http://localhost:3000/balance`
- Response: `{ "balance": number }`

### 4. Get Transaction History

- `curl http://localhost:3000/transactions`
- Response:
  ```json
  {
    "transactions": [
      {
        "type": "deposit",
        "amount": 100,
        "timestamp": "2025-02-14T17:21:58.649Z"
      },
      {
        "type": "withdrawal",
        "amount": 50,
        "timestamp": "2025-02-14T17:22:05.989Z"
      }
    ]
  }
  ```


## Unit Tests
- Run:
`npm run test`