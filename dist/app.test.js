"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ledger_1 = require("./ledger");
const app_1 = require("./app"); // You need to export your Express app from app.ts
describe("API Endpoints", () => {
    let ledger;
    beforeEach(() => {
        ledger = new ledger_1.Ledger();
    });
    test("should return initial balance of 0", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/balance");
        expect(response.status).toBe(200);
        expect(response.body.balance).toBe(0);
    }));
    test("should deposit funds correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/transaction/deposit")
            .send({ amount: 100 });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deposit successful");
        expect(response.body.balance).toBe(100);
    }));
    test("should return error for invalid deposit amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/transaction/deposit")
            .send({ amount: -100 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid deposit amount");
    }));
    test("should withdraw funds correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/transaction/deposit").send({ amount: 200 });
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/transaction/withdrawal")
            .send({ amount: 50 });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Withdrawal successful");
        expect(response.body.balance).toBe(150);
    }));
    test("should return error for insufficient balance on withdrawal", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/transaction/deposit").send({ amount: 50 });
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/transaction/withdrawal")
            .send({ amount: 100 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Insufficient balance");
    }));
    test("should return error for invalid withdrawal amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/transaction/withdrawal")
            .send({ amount: -50 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid withdrawal amount");
    }));
    test("should return transaction history", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/transaction/deposit").send({ amount: 100 });
        yield (0, supertest_1.default)(app_1.app).post("/transaction/withdrawal").send({ amount: 50 });
        const response = yield (0, supertest_1.default)(app_1.app).get("/transactions");
        expect(response.status).toBe(200);
        expect(response.body.transactions.length).toBe(2);
        expect(response.body.transactions[0].type).toBe("deposit");
        expect(response.body.transactions[1].type).toBe("withdrawal");
    }));
});
