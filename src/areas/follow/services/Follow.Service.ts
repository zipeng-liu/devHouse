import ISettingService from "../services/IFollow.Service";
import DBClient from "../../../PrismaClient";
import type { User } from "@prisma/client";

export class FollowService implements ISettingService {
  readonly _db: DBClient = DBClient.getInstance();

  async getFollowedUsers(userId: string): Promise<User[]> {
    const followedUserIds = (await this._db.prisma.follows.findMany({
      where: {
        followingId: userId,
      },
      select: {
        followedById: true,
      },
    })).map((follow) => follow.followedById);

    const followedUsers = await this._db.prisma.user.findMany({
      where: {
        id: {
          in: followedUserIds,
        },
      },
    });

    return followedUsers;
  }

  async getUnfollowedUsers(userId: string): Promise<User[]> {
    const followedUserIds = (await this._db.prisma.follows.findMany({
      where: {
        followingId: userId,
      },
      select: {
        followedById: true,
      },
    })).map((follow) => follow.followedById);

    const unfollowedUsers = await this._db.prisma.user.findMany({
      where: {
        NOT: {
          id: {
            in: followedUserIds,
          },
        },
      },
    });

    return unfollowedUsers;
  }

  async followUser(userId: string, followedUserId: string): Promise<void> {
    await this._db.prisma.follows.create({
      data: {
        followedById: userId,
        followingId: followedUserId,
      },
    });
  }
}

