import { TaskRepository } from "../domain/ports.js";
import { Task } from "../domain/entities.js";
import { firestore } from "../config/firestore.js";

// Firestore-backed persistence layer for task entities.
export class FirestoreTaskRepository implements TaskRepository {
  private readonly collection = firestore.collection("tasks");

  async listByUser(userId: string): Promise<Task[]> {
    const snap = await this.collection
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Task, "id">),
    }));
  }

  async create(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const data = { ...task, createdAt: Date.now() };
    const doc = await this.collection.add(data);
    return { id: doc.id, ...data } as Task;
  }

  async update(
    taskId: string,
    patch: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Task> {
    const ref = this.collection.doc(taskId);
    await ref.set(patch, { merge: true });
    const fresh = await ref.get();
    return { id: taskId, ...(fresh.data() as Omit<Task, "id">) };
  }

  async delete(taskId: string): Promise<void> {
    await this.collection.doc(taskId).delete();
  }
}
