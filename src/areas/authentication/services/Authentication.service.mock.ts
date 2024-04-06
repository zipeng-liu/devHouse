import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import IUser from "../../../interfaces/user.interface";

const SALT_ROUNDS = 10;

// FIXME: Don't forget: you shouldn't have the type "any"!
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | IUser | null> {
    const user = this._db.users.find(user => user.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  public async findUserByEmail(email: string): Promise<User | IUser | null> {
    const user = this._db.users.find(user => user.email === email);
    if (user) {
      return user;
    }
    return null;
  }

  public async createUser(user: UserDTO): Promise<User | IUser> {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const newUser: User = {
      id: randomUUID(),
      profilePicture: user.profilePicture || "",
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    };
    this._db.users.push(newUser);
    return newUser;
  }

  public async getUserById(id: string): Promise<User | IUser | null> {
    const user = this._db.users.find(user => user.id === id);
    if (user) {
      return user;
    }
    return null;
  }
}
