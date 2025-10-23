import { Controller, Post, Route, Body, Tags } from 'tsoa';
import { GeminiService } from '../services/geminiService';
import { ChatRequest, ChatResponse } from '../types/gemini';

@Route('gemini')
@Tags('Gemini')
export class GeminiController extends Controller {
  private service = new GeminiService();

  @Post('chat')
  public async chat(@Body() body: ChatRequest): Promise<ChatResponse> {
    return this.service.chat(body);
  }
}
