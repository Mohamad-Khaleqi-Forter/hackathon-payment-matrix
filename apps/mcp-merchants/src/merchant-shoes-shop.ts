import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

import { getAllShoes } from "./merchants-storage/merchant-shoes";

const server = new McpServer({
  name: "Merchants A MCP Server(Shoes)",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-list-shoes",
  "show list of available shoes in the shop",
  async () => {
    try {
      const allShoes = getAllShoes();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(allShoes),
          },
        ],
      };
    } catch (error) {
      console.error(error);

      return {
        content: [
          {
            type: "text",
            text: `Something went wrong while getting the list of shoes`,
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