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

    const mcpForter = await createMCPClient({
      transport: new StdioMCPTransport({
        command: "node",
        args: [process.env.MCP_TOOLS_FORTER_PATH!],
      }),
    });

    const toolMerchantShoes = await mcpMerchantShoes.tools();
    const toolMerchantTshirt = await mcpMerchantTshirt.tools();
    const toolForter = await mcpForter.tools();

    return {
      ...toolMerchantShoes,
      ...toolMerchantTshirt,
      ...toolForter,
    };
  }

  async generateResponse(session_id: string, text: string): Promise<string> {
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

      const { text: response } = await generateText({
        model: google(this.model),
        prompt: conversationContext,
        tools: await this.getMCPTools()
      });

      // Add assistant response to history
      this.sessionService.addMessage(session_id, {
        role: "assistant",
        content: response,
      });

      return response || "No response generated";
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
