import { MCPClient } from "@mastra/mcp";

export class ChatToolsService {
  private mcpMerchantShoes: MCPClient;
  private mcpMerchantTshirt: MCPClient;
  private mcpMerchantHelpers: MCPClient;
  private mcpForter: MCPClient;

  constructor() {
    this.mcpMerchantShoes = new MCPClient({
      id: "merchant-shoes",
      servers: {
        localTools: {
          command: "node",
          args: [process.env.MCP_TOOLS_MERCHANT_SHOES_PATH!],
        },
      },
    });

    this.mcpMerchantTshirt = new MCPClient({
      id: "merchant-tshirt",
      servers: {
        localTools: {
          command: "node",
          args: [process.env.MCP_TOOLS_MERCHANT_TSHIRT_PATH!],
        },
      },
    });

    this.mcpMerchantHelpers = new MCPClient({
      id: "merchant-helpers",
      servers: {
        localTools: {
          command: "node",
          args: [process.env.MCP_TOOLS_MERCHANT_HELPERS_PATH!],
        },
      },
    });

    this.mcpForter = new MCPClient({
      id: "merchant-forter",
      servers: {
        localTools: {
          command: "node",
          args: [process.env.MCP_TOOLS_FORTER_PATH!],
        },
      },
    });
  }

  private validateConfig() {
    if (!process.env.MCP_TOOLS_MERCHANT_SHOES_PATH) {
      throw new Error("MCP_TOOLS_MERCHANT_SHOES_PATH environment variable is not set");
    }
    if (!process.env.MCP_TOOLS_MERCHANT_TSHIRT_PATH) {
      throw new Error("MCP_TOOLS_MERCHANT_TSHIRT_PATH environment variable is not set");
    }
    if (!process.env.MCP_TOOLS_MERCHANT_HELPERS_PATH) {
      throw new Error("MCP_TOOLS_MERCHANT_HELPERS_PATH environment variable is not set");
    }
    if (!process.env.MCP_TOOLS_FORTER_PATH) {
      throw new Error("MCP_TOOLS_FORTER_PATH environment variable is not set");
    }
  }

  async getTools() {
    this.validateConfig();
    
    return {
      ...(await this.mcpMerchantShoes.getTools()),
      ...(await this.mcpMerchantTshirt.getTools()),
      ...(await this.mcpMerchantHelpers.getTools()),
      ...(await this.mcpForter.getTools()),
    };
  }
} 