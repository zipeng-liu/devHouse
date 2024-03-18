import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";
//import IUser from "interfaces/user.interface";

// FIXME: Don't forget: you shouldn't have the type "any"!
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    
    const user = this._db.users.find((userdb) => userdb.email === email && userdb.password === password);
      if (user) {
        return user;
      }
      //throw new Error(`Couldn't find user with id: ${id}`);
      return null
    // throw new Error("Method not yet implemented! ❌");
    // findById: (id: number) => {
    //   const user = database.find((user) => user.id === id);
    //   if (user) {
    //     return user;
    //   }
    //   //throw new Error(`Couldn't find user with id: ${id}`);
    //   return null;
    // },
  }

  public async findUserByEmail(email: any): Promise<User | null> {
    throw new Error("Method not yet implemented! ❌");
    // try {
      
    // } catch (error) {
    //   console.log(error);
    // }
  }

  public async createUser(user: UserDTO): Promise<User> {
    throw new Error("Method not yet implemented! ❌");
  }

  public async getUserById(id: any): Promise<User | null> {
    throw new Error("Method not yet implemented! ❌");
  }
}
