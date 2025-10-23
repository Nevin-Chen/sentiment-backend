export type Role = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ChatRequest {
  symbol: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  raw?: any;
}
