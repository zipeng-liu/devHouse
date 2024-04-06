import type { User } from "@prisma/client";
export type UserDTO = Omit<User, "id">;
import IUser from "../../../interfaces/user.interface";

export interface IAuthenticationService {
  findUserByEmail(email: String): Promise<User | IUser | null>;
  createUser(user: UserDTO): Promise<User | IUser>;
  getUserByEmailAndPassword(email: string, password: string): Promise<User | IUser | null>;
  getUserById(id: string): Promise<User | IUser | null>;
}
