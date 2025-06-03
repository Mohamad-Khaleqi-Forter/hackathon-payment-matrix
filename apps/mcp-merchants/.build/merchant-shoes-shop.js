"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const merchant_shoes_1 = require("./merchants-storage/merchant-shoes");
const server = new mcp_js_1.McpServer({
    name: "Merchants A MCP Server(Shoes)",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool("get-list-shoes", "show list of available shoes in the shop", async () => {
    try {
        const allShoes = (0, merchant_shoes_1.getAllShoes)();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(allShoes),
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
                    text: `Something went wrong while getting the list of shoes`,
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
