import { Controller, Get, Route, Path, Tags } from "tsoa";
import { Todo } from "./todo";
import { TodoService } from "./todoService";

@Route("todos")
@Tags("Todos")
export class TodoController extends Controller {
  private service: TodoService;

  constructor() {
    super();
    this.service = new TodoService();
  }

  @Get("{id}")
  public async getTodo(@Path() id: number): Promise<Todo> {
    return this.service.getTodo(id);
  }
}
