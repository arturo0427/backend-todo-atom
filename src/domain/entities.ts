export interface User {
  id: string;
  email: string;
  password: string | null;
  createdAt: number;
}
export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
  completed: boolean;
}
