import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import type { User, Post, Comment } from "@prisma/client";
import DBClient from "../../../PrismaClient";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  
  async addPost(post: Post, username: string): Promise<void> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  async getAllPosts(userId: string): Promise<Post[] | IPost[]> {
    // 🚀 Implement this yourself.
    const posts = await this._db.prisma.post.findMany({
      where: {
        userId: userId
      },
      include: {
        commentList: true
      }
    });
    return posts;
  }

  async findById(id: string): Promise<Post | IPost | undefined> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  async addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): Promise<void> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  async sortPosts(posts: Post[] | IPost[]): Promise<Post[] | IPost[]> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
