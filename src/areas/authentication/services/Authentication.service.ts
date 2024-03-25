import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService, UserDTO } from "./IAuthentication.service";
import type { User } from "@prisma/client";
import { randomUUID } from "node:crypto";
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
    const user = this.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, (await user).password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  }

  async createUser(user: UserDTO): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser: User = {
      ...user,
      id: randomUUID(),
      password: hashedPassword,
    };
    await this._db.prisma.user.create({
      data: newUser,
    });

    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return await this._db.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
