import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatRequest, ChatResponse } from './gemini';

export class GeminiService {
  private apiKey = process.env.GEMINI_API_KEY || '';
  private model = 'gemini-2.5-flash';
  private genAI = new GoogleGenerativeAI(this.apiKey);

  public async chat(req: ChatRequest): Promise<ChatResponse> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.model,
      });

      const contents = req.messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({
        systemInstruction: "You are a professional financial analyst and trading assistant. You specialize in technical analysis and identifying market trends. When responding to users, consider chart patterns, price action, volume, and recent news events. Keep responses accurate, concise, and tailored for retail investors with a solid understanding of trading.",
        history: contents.slice(0, -1),
      });

      const lastMessage = req.messages.length > 0 ? req.messages[req.messages.length - 1].content : '';
      const result = await model.generateContent(lastMessage);
      const text = result.response.text();

      return {
        reply: text,
        raw: result.response,
      };
    } catch (error) {
      return {
        reply: 'Something went wrong while generating a response.',
        raw: error,
      };
    }
  }
}
