import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

const server = new McpServer({
  name: "Merchants MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-list-items",
  "show list of items in the shop",
  {
    userEmail: z
      .string()
      .describe(
        "user email to which the message will be sent"
      ),
  },
  async ({ userEmail }) => {
    try {
      // send email

      return {
        content: [
          {
            type: "text",
            text: `Message sent to email address: ${userEmail}`,
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

server.tool(
  "send-email",
  "Send all of the chat and cotext via email to user using user email",
  {
    userEmail: z
      .string()
      .describe(
        "user email to which the message will be sent"
      ),
  },
  async ({ userEmail }) => {
    try {
      // send email

      return {
        content: [
          {
            type: "text",
            text: `Message sent to email address: ${userEmail}`,
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