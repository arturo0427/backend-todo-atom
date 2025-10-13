import { FirestoreTaskRepository } from "../infrastructure/firestoreTaskRepository.js";
import { FirestoreUserRepository } from "../infrastructure/firestoreUserRepository.js";
import { TaskService } from "../application/tasks.js";
import { UserService } from "../application/users.js";

export function buildServices() {
  const userRepo = new FirestoreUserRepository();
  const taskRepo = new FirestoreTaskRepository();
  return { users: new UserService(userRepo), tasks: new TaskService(taskRepo) };
}
