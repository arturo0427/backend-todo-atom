import { UserRepository } from "../domain/ports.js";
import { User } from "../domain/entities.js";
import { firestore } from "../config/firestore.js";

// Firestore-backed repository for user records keyed by email.
export class FirestoreUserRepository implements UserRepository {
  private readonly collection = firestore.collection("users");

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.collection.doc(email).get();
    return doc.exists ? (doc.data() as User) : null;
  }

  async create(userData: {
    email: string;
    password: string | null;
  }): Promise<User> {
    const user: User = {
      id: userData.email,
      email: userData.email,
      password: userData.password,
      createdAt: Date.now(),
    };
    await this.collection.doc(user.id).set(user);
    return user;
  }
}
