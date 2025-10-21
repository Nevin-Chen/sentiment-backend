import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatRequest, ChatResponse } from './gemini';
import { generateSystemPrompt } from './prompts/systemPrompt';

export class GeminiService {
  private apiKey = process.env.GEMINI_API_KEY || '';
  private model = 'gemini-2.5-flash';
  private genAI = new GoogleGenerativeAI(this.apiKey);

  public async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.model,
      });

      const contents = request.messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({
        systemInstruction: {
          role: 'system',
          parts: [{ text: generateSystemPrompt(request.ticker) }]
        },
        history: contents.slice(0, -1),
      });

      const lastMessage = request.messages[request.messages.length - 1]?.content || '';
      const result = await chat.sendMessage(lastMessage);
      const text = result.response.text();

      return {
        reply: text,
        raw: result.response,
      };
    } catch (error) {
      console.error(error);
      return {
        reply: 'Something went wrong while generating a response. Error:' + error,
        raw: error,
      };
    }
  }
}
