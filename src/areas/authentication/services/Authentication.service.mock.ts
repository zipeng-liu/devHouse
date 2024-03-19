import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";
import bcrypt from "bcrypt";

// FIXME: Don't forget: you shouldn't have the type "any"!
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = this._db.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return this._db.users.find((user) => user.email === email) || null;
  }

  public async createUser(user: UserDTO): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser: User = {
      ...user,
      id: randomUUID(),
      password: hashedPassword,
    };
    this._db.users.push(newUser);

    return newUser;
  }

  public async getUserById(id: string): Promise<User | null> {
    return this._db.users.find((user) => user.id === id) || null;
  }
}
