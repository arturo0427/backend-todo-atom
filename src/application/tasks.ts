import { TaskRepository } from "../domain/ports.js";
import { Task } from "../domain/entities.js";

// Encapsulates business rules for managing task entities.
export class TaskService {
  constructor(private readonly tasks: TaskRepository) {}

  // Obtain tasks for a specific user ordered by creation date.
  list(userId: string) {
    return this.tasks.listByUser(userId);
  }

  // Validate and persist a new task for the given user.
  create(userId: string, title: string, description?: string): Promise<Task> {
    if (!title?.trim()) throw new Error("Title is required");
    return this.tasks.create({
      userId,
      title: title.trim(),
      description,
      completed: false,
    });
  }

  // Apply partial updates while enforcing domain constraints.
  update(
    taskId: string,
    patch: Partial<Pick<Task, "title" | "description" | "completed">>
  ) {
    if (patch.title !== undefined && !patch.title.trim())
      throw new Error("Title cannot be empty");
    return this.tasks.update(taskId, patch);
  }

  // Remove a task permanently.
  remove(taskId: string) {
    return this.tasks.delete(taskId);
  }
}
