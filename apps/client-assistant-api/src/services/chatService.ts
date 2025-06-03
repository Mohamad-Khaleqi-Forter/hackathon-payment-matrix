import { google } from "@ai-sdk/google";
import {
  ChatSessionService,
  Message,
  SessionInfo,
} from "./chatSessionService.js";
import { Agent } from "@mastra/core/agent";
import { ChatToolsService } from "./chatToolsService.js";

const LLM_MODEL = google("models/gemini-2.0-flash-exp");

export class ChatService {
  private chatSessionService: ChatSessionService;
  private chatToolsService: ChatToolsService;

  constructor() {
    this.chatSessionService = new ChatSessionService();
    this.chatToolsService = new ChatToolsService();
    this.validateConfig();
  }

  private validateConfig() {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error(
        "GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set"
      );
    }
  }

  async generateResponse(session_id: string, text: string) {
    try {
      // Add user message to history
      this.chatSessionService.addMessage(session_id, {
        role: "user",
        content: text,
      });

      // Construct the conversation context
      const conversationContext = this.chatSessionService
        .getHistory(session_id)
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const agent = new Agent({
        name: "Remote Tool Agent",
        instructions: `
You assist users by utilizing remote tools.
Your responses must always be formatted as **Markdown**, making them easy to read and visually structured in chat.

Follow these formatting rules:
- Use \`#\`, \`##\`, etc. for headings when introducing sections.
- Enclose code, tool output, or JSON in triple backtick blocks (e.g. \`\`\`json).
- Use bullet points (• or -) for lists.
- Use tables for tabular data.
- Bold key values or field names where helpful.
- Do not return raw, unformatted data.
- Never explain formatting – just format it correctly.

Keep your responses concise, helpful, and structured.
`,
        model: LLM_MODEL,
        tools: await this.chatToolsService.getTools(),
      });

      const response = await agent.generate(conversationContext);
      const output: string = response.text ?? "No response generated";

      // Add assistant response to history
      this.chatSessionService.addMessage(session_id, {
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
    return this.chatSessionService.getHistory(session_id);
  }

  getAllSessions(): SessionInfo[] {
    return this.chatSessionService.getAllSessions();
  }
}
