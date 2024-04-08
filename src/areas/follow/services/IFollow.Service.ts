import DBClient from "../../../PrismaClient";
import type { User } from "@prisma/client";

export default interface IFollowService {
  readonly _db: DBClient;
  getFollowedUsers(userId: string): Promise<User[]>;
  getUnfollowedUsers(userId: string): Promise<User[]>;
  followUser(userId: string, followedUserId: string): Promise<void>;
  unfollowUser(userId: string, unfollowedUserId: string): Promise<void>;
}
