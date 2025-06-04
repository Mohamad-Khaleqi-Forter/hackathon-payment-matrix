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

  async generateResponse(
    session_id: string,
    text: string,
    email: string,
    autoBuy: boolean = false
  ) {
    try {
      // Add user message to history
      this.chatSessionService.addMessage(session_id, {
        role: "user",
        content: text,
        autoBuy,
      });

      // Construct the conversation context
      const conversationContext = this.chatSessionService
        .getHistory(session_id)
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const agent = new Agent({
        name: "Forter Shopping Assistant",
        instructions: `
You assist users by browsing products and making payments, utilizing remote tools.

Your responses must always be formatted as **Markdown** or HTML, making them easy to read and visually structured in chat.
If response contains items or products with images, make sure to include the image in the response, and format as HTML table with amazing ux. include the image thumbnail, and basic item details.

Follow these formatting rules:
- Use \`#\`, \`##\`, etc. for headings when introducing sections.
- Enclose code, tool output, or JSON in triple backtick blocks (e.g. \`\`\`json).
- Use bullet points (• or -) for lists.
- Use tables for tabular data.
- Bold key values or field names where helpful.
- Do not return raw, unformatted data.
- Never explain formatting – just format it correctly.

When answering a question that requires sorting or filtering, make sure to validate your answer, like sorting and filtering by price and similar, make sure to parse amounts correctly.

If you are showing payment details:
- Do not display any payment tokens or payment details.
- In case payment is successful just say "Payment successful" and list amounts and payment id, which should be in bold.
- As part of confirming display email and shipping address, which should be in bold.
- Do not display any information about how to proceed with payment.
- Do not display anything beside generated markdown.

When initiating a payment:
- When email is required use this one: "${email}", do not ask for email or for it's confirmation, but make sure to output it to the user.
- Make sure to always ask for shipping address before proceeding, which need to happen before payment confirmation or OTP.
- Then always follow up with a question to confirm the payment, which will confirm list of items.
${!autoBuy ? "- Make sure to ask for OTP confirmation before proceeding, which is done after the payment is confirmed." : " - If OTP password is required then use a random 6 digit number and don't output it to the user."}

Keep your responses concise, helpful, and structured.
`,
        model: LLM_MODEL,
        tools: await this.chatToolsService.getTools(),
      });

      const response = await agent.generate(conversationContext);
      const output: string = response.text ?? "No response generated";

      console.log("output", output);

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
