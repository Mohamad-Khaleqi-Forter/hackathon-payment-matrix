"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const merchant_tshirt_1 = require("./merchants-storage/merchant-tshirt");
const server = new mcp_js_1.McpServer({
    name: "Merchants A MCP Server(tshirt)",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool("get-list-tshirts", "show list of tshirts in the shop", async () => {
    try {
        const allTshirts = (0, merchant_tshirt_1.getAllTshirts)();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(allTshirts),
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
                    text: `Something went wrong while getting the list of tshirts`,
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
