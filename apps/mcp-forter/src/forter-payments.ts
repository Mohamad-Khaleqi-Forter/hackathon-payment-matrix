import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from 'axios';

import { z } from "zod";

const server = new McpServer({
  name: "Forter MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

const FORTER_PAYMENTS_ORCHESTRATION_URL = "http://localhost:3000";
const CurrencySchema = z.enum(['USD', 'EUR' , 'GBP']); 
type CurrencyType = z.infer<typeof CurrencySchema>;
export const generatePaymentCreateRequest = (
  amount: number = 2000,
  currency: CurrencyType = "USD",
  cardNumber: string = '4242424242424242',
) => {
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


server.tool(
  "payment-create",
  "pay for an item with given amount and currency",
  {
    amount: z
      .number()
      .describe(
        "amount in cents to pay for the item, e.g. 2000 for $20.00"
      ),
    currency: CurrencySchema.default("USD").describe("currency of the payment"),
  },
  async ({ amount, currency }) => {
    const paymentPayload = generatePaymentCreateRequest(amount, currency);
    try {
      const PaymentResponse = await axios.post(`${FORTER_PAYMENTS_ORCHESTRATION_URL}/payments`, paymentPayload);
        
      return {
        content: [
          {
            type: "text",
            text: 'PaymentResponse: ' + JSON.stringify(PaymentResponse.data),
          },
        ],
      };
    } catch (error) {
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
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Something went wrong", error);
  process.exit(1);
});