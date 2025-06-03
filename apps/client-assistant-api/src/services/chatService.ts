import {
  experimental_createMCPClient as createMCPClient,
  generateText,
} from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { google } from "@ai-sdk/google";
import { ChatSessionService, Message, SessionInfo } from "./chatSessionService";

export class ChatService {
  private model: string = "models/gemini-2.0-flash-exp";
  private sessionService: ChatSessionService;

  constructor() {
    this.sessionService = new ChatSessionService();
    this.validateConfig();
  }

  private validateConfig() {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error(
        "GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set"
      );
    }
  }

  private async getMCPTools() {
    const mcpMerchantShoes = await createMCPClient({
      transport: new StdioMCPTransport({
        command: "node",
        args: [process.env.MCP_TOOLS_MERCHANT_SHOES_PATH!],
      }),
    });

    const mcpMerchantTshirt = await createMCPClient({
      transport: new StdioMCPTransport({
        command: "node",
        args: [process.env.MCP_TOOLS_MERCHANT_TSHIRT_PATH!],
      }),
    });

    const mcpMerchantHelpers = await createMCPClient({
      transport: new StdioMCPTransport({
        command: "node",
        args: [process.env.MCP_TOOLS_MERCHANT_HELPERS_PATH!],
      }),
    });

    const mcpForter = await createMCPClient({
      transport: new StdioMCPTransport({
        command: "node",
        args: [process.env.MCP_TOOLS_FORTER_PATH!],
      }),
    });

    const toolMerchantShoes = await mcpMerchantShoes.tools();
    const toolsMerchantHelpers = await mcpMerchantHelpers.tools();
    const toolMerchantTshirt = await mcpMerchantTshirt.tools();
    const toolForter = await mcpForter.tools();

    return {
      ...toolMerchantShoes,
      ...toolMerchantTshirt,
      ...toolsMerchantHelpers,
      ...toolForter,
    };
  }

  async generateResponse(session_id: string, text: string) {
    try {
      // Add user message to history
      this.sessionService.addMessage(session_id, {
        role: "user",
        content: text,
      });

      // Construct the conversation context
      const conversationContext = this.sessionService
        .getHistory(session_id)
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const response = await generateText({
        model: google(this.model),
        prompt: conversationContext,
        tools: await this.getMCPTools(),
      });

      console.log("Response from LLM:");
      console.log(JSON.stringify(response));

      let output: string | Record<string, any> =
        response.text ?? "No response generated";

      if (response.steps) {
        output = response.steps.reverse().flatMap((step) => {
          return step.toolResults.map((toolResult) => {
            if (!toolResult.result || !toolResult.toolName) {
              return {
                toolName: toolResult.toolName ?? "Unknown Tool",
                content: "No response generated",
              };
            }

            return {
              toolName: toolResult.toolName,
              content: toolResult.result.content,
            };
          });
        });
      }

      // Add assistant response to history
      this.sessionService.addMessage(session_id, {
        role: "assistant",
        content: output,
      });

      return output;
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error("Failed to generate response from LLM");
    }
  }

  getSessionHistory(session_id: string): Message[] {
    return this.sessionService.getHistory(session_id);
  }

  getAllSessions(): SessionInfo[] {
    return this.sessionService.getAllSessions();
  }
}
