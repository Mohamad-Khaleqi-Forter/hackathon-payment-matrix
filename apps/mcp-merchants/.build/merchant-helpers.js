"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const server = new mcp_js_1.McpServer({
    name: "Merchants helpers server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool("send-email", "send confirmation email to user using user email", {
    userEmail: zod_1.z
        .string()
        .describe("user email to which the message will be sent"),
}, async ({ userEmail }) => {
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
