"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaymentCreateRequest = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const server = new mcp_js_1.McpServer({
    name: "Forter MCP Server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
const FORTER_PAYMENTS_ORCHESTRATION_URL = "http://localhost:3000";
const CurrencySchema = zod_1.z.enum(['USD', 'EUR', 'GBP']);
const generatePaymentCreateRequest = (amount = 2000, currency = "USD", cardNumber = '4242424242424242') => {
    return {
        cartItems: [],
        amount,
        currency,
        paymentMethod: {
            _orchestrationTokenAlias: 'mock',
            type: 'card',
            card: {
                cardHolderName: 'Mihrdad',
                cardNumber,
                expirationMonth: 12,
                expirationYear: 2030,
                cardCvc: '123',
            },
        },
        captureMethod: 'automatic',
    };
};
exports.generatePaymentCreateRequest = generatePaymentCreateRequest;
server.tool("payment-create", "pay for an item with given amount and currency", {
    amount: zod_1.z
        .number()
        .describe("amount in cents to pay for the item, e.g. 2000 for $20.00"),
    currency: CurrencySchema.default("USD").describe("currency of the payment"),
}, async ({ amount, currency }) => {
    const paymentPayload = (0, exports.generatePaymentCreateRequest)(amount, currency);
    try {
        const PaymentResponse = await axios_1.default.post(`${FORTER_PAYMENTS_ORCHESTRATION_URL}/payments`, paymentPayload);
        return {
            content: [
                {
                    type: "text",
                    text: 'PaymentResponse: ' + JSON.stringify(PaymentResponse.data),
                },
            ],
        };
    }
    catch (error) {
        console.error(error);
        return {
            content: [
                {
                    type: "text",
                    text: `Something went wrong`,
                },
            ],
        };
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Something went wrong", error);
    process.exit(1);
});
