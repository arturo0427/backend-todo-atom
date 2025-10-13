import bcrypt from "bcryptjs";
import { UserRepository } from "../domain/ports.js";

// Coordinates user authentication and persistence behavior.
export class UserService {
  constructor(private readonly users: UserRepository) {}

  // Authenticate by verifying credentials or provisioning a new user record.
  async login(email: string, password: string) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("Invalid email format");
    }

    const user = await this.users.findByEmail(email);

    if (!user) {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = await this.users.create({ email, password: hashed });
      return newUser;
    }

    if (!user.password) {
      const hashed = await bcrypt.hash(password, 10);
      const updatedUser = await this.users.create({ email, password: hashed });
      return updatedUser;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid password");

    return user;
  }
}
