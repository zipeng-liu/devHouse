import IPost from "../../../interfaces/post.interface";
import IPostService, { PostDTO } from "./IPostService";
import DBClient from "../../../PrismaClient";
import IComment from "../../../interfaces/comment.interface";
import { create } from "node:domain";
import type { Post } from "@prisma/client";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  sortPosts(posts: {
    id: number;
    content: string;
    userId: number;
    likes: number;
    createdAt: Date;
  }): Promise<{ id: number; content: string; userId: number; likes: number; createdAt: Date }[]> {
    throw new Error("Method not implemented.");
  }
  // addCommentToPost(id: number, createdAt: string, userId: number, message: string, postId: number): Promise<{ id: number; content: string; userId: number; likes: number; createdAt: Date; }> {
  //   throw new Error("Method not implemented.");
  // }
  readonly _db: DBClient = DBClient.getInstance();
  // private prisma = DBClient.getInstance().prisma;

  async addPost(post: PostDTO, userId: number): Promise<Post> {
    const newPost = {
      ...post,
      userId: userId,
    };
    const postnew = await this._db.prisma.post.create({
      data: newPost,
    });

    return postnew;
  }

  async getAllPosts(username: string): Promise<Post[]> {
    const user = await this._db.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      return await this._db.prisma.post.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }
    return;
  }

  async findById(id: number): Promise<Post> {
    return await this._db.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  // addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
  //   // 🚀 Implement this yourself.
  // }

  // async sortPosts(posts: Post[]): Promise<Post[]> {
  //   return await this._db.prisma.post.findMany({
  //     orderBy: {
  //       createdAt: "asc",
  //     },
  //   });
  // }

  async getAllTest(): Promise<Post[]> {
    return await this._db.prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
