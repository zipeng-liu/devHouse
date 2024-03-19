import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const user = this._db.users.find((user) => user.email === email && user.password === password);
      return user ?? null;
    } catch (error) {
      throw new Error(`Couldn't find user with email: ${email}`);
    }
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  }

  public async createUser(user: UserDTO): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      email: user.email,
      password: user.password,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    this._db.users.push(newUser);
    return newUser;
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = this._db.users.find((user) => user.id === id);
    return user ?? null;
  }
}
