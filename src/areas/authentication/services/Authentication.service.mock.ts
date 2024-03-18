import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";

// FIXME: Don't forget: you shouldn't have the type "any"!
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = this._db.users.find((user) => user.email === email && user.password === password);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
    
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  }

  public async createUser(user: UserDTO): Promise<User> {
    throw new Error("Method not yet implemented! ❌");
  }

  public async getUserById(id: any): Promise<User | null> {
    const user = this._db.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
  }
}
