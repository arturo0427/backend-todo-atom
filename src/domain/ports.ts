import { Task, User } from "./entities.js";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(userData: { email: string; password: string | null }): Promise<User>;
}

export interface TaskRepository {
  listByUser(userId: string): Promise<Task[]>;
  create(task: Omit<Task, "id" | "createdAt">): Promise<Task>;

  update(
    taskId: string,
    patch: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Task>;
  delete(taskId: string): Promise<void>;
}
