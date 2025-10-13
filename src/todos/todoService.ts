import axios from "axios";
import { Todo } from "./todo";

export class TodoService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "https://jsonplaceholder.typicode.com/todos";
  }

  public async getTodo(id: number): Promise<Todo> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`);
      const data = response.data;

      const todo: Todo = {
        userId: data.userId,
        id: data.id,
        title: data.title,
        completed: data.completed,
      };

      return todo;
    } catch (err) {
      console.error("Error fetching TODO:", err);
      throw new Error("Failed to fetch TODO");
    }
  }
}
