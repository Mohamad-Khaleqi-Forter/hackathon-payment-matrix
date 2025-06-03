import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";


import { getAllTshirts } from "./merchants-storage/merchant-tshirt";

const server = new McpServer({
  name: "Merchants A MCP Server(tshirt)",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-list-tshirts",
  "show list of tshirts in the shop",
  async () => {
    try {
      const allTshirts = getAllTshirts();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(allTshirts),
          },
        ],
      };
    } catch (error) {
      console.error(error);

      return {
        content: [
          {
            type: "text",
            text: `Something went wrong while getting the list of tshirts`,
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