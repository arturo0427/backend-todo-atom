import { TaskRepository } from "../domain/ports.js";
import { Task } from "../domain/entities.js";
export class TaskService {
  constructor(private readonly tasks: TaskRepository) {}
  list(userId: string) {
    return this.tasks.listByUser(userId);
  }
  create(userId: string, title: string, description?: string): Promise<Task> {
    if (!title?.trim()) throw new Error("Title is required");
    return this.tasks.create({
      userId,
      title: title.trim(),
      description,
      completed: false,
    });
  }
  update(
    taskId: string,
    patch: Partial<Pick<Task, "title" | "description" | "completed">>
  ) {
    if (patch.title !== undefined && !patch.title.trim())
      throw new Error("Title cannot be empty");
    return this.tasks.update(taskId, patch);
  }
  remove(taskId: string) {
    return this.tasks.delete(taskId);
  }
}
