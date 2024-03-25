import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import type { User } from "@prisma/client";

export class AuthenticationService implements IAuthenticationService {
  readonly _db: DBClient = DBClient.getInstance();

  async findUserByEmail(email: string): Promise<User | null> {
    // 🚀 Talk to your real database here (I did this one for you)
    return await this._db.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return await this._db.prisma.user.findUniqueOrThrow({
      where: {
        email: email,
        password: password
      }
    })
   
  }
  async createUser(user: UserDTO): Promise<User> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }

  getUserById(id: string): Promise<User | null> {
    return this._db.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
