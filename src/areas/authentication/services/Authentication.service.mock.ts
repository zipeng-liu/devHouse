import { database } from "../../../model/fakeDB";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import { randomUUID } from "node:crypto";
import type { User } from "@prisma/client";
import cryptoRandomString from 'crypto-random-string';
import bcrypt from 'bcrypt'
//import IUser from "interfaces/user.interface";
const saltRounds = 10;

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
    try {
      const user = this._db.users.find((userdb) => userdb.email === email);
      if(user){
        return user;
      } 
      return null;   
    } catch (error) {
      console.log(error);
    }
  }

  public async createUser(user: UserDTO): Promise<User> {
    try {
      const createId = cryptoRandomString({length: 10});
      const hashedPassword = await bcrypt.genSalt(saltRounds, function(err, salt) { 
        bcrypt.hash(user.password, salt, function(err, hash) {
          if(hash) {
            return hash
          } else {
            console.log(err);
          }
        });
      });
      const newUser: User = {
        id: createId,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      this._db.users.push(newUser); 
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserById(id: any): Promise<User | null> {
    try {
      const user = this._db.users.find((userdb) => userdb.id === id);
      if(user){
        return user;
      } 
      return null;  
    } catch (error) {
      console.log(error);
    }
  }
}
