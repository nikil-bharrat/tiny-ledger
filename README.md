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
