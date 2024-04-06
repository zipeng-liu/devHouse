import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import type { User } from "@prisma/client";
import bcrypt from "bcrypt";

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
    // 🚀 Talk to your real database here
    const user = await this._db.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async createUser(user: UserDTO): Promise<User> {
    // 🚀 Talk to your real database here
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this._db.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture, 
      },
    });

    return createdUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this._db.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user || null;
  }
}
