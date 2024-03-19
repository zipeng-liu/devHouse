import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";

// FIXME: Don't forget: you shouldn't have the type "any"!
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const user = this._db.users.find(user => user.email === email && user.password === password);
      if (user) {
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      console.log("Error in getUserByEmailAndPassword:", error);
      return null;
    }
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = this._db.users.find(user => user.email === email);
      if (user) {
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      console.log("Error in findUserByEmail:", error);
      return null;
    }
  }

  public async createUser(user: UserDTO): Promise<User> {
    try {
      const newUser: User = {
        id: randomUUID(),
        profilePicture: user.profilePicture || "",
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        posts: [],
      };
      this._db.users.push(newUser);
      return newUser;
    } catch (error) {
      console.log("Error in createUser:", error);
      throw error;
    }
  }

  public async getUserById(id: string): Promise<User | null> {
    try {
      const user = this._db.users.find(user => user.id === id);
      if (user) {
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      console.log("Error in getUserById:", error);
      return null;
    }
  }
}
