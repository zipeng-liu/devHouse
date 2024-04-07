import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import type { User, Post, Comment } from "@prisma/client";
import DBClient from "../../../PrismaClient";
import IComment from "../../../interfaces/comment.interface";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  
  async addPost(message: string, userId: string): Promise<void> {
    // 🚀 Implement this yourself.
    await this._db.prisma.post.create({
      data: {
        message: message,
        userId: userId,
        createdAt: new Date(),
        likes: 0,
        comments: 0
      }
    });
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
    const post = await this._db.prisma.post.findUnique({
      where: {
        id: id
      },
      include: {
        commentList: true
      }
    });
    return post;
  }

  async addCommentToPost(message: string, postId: string, userId: string): Promise<void> {
    // 🚀 Implement this yourself.
    await this._db.prisma.comment.create({
      data: {
        message: message,
        createdAt: new Date(),
        userId: userId,
        postId: postId
      }
    });
    await this._db.prisma.post.update({
      where: {
        id: postId
      },
      data: {
        comments: {
          increment: 1
        }
      }
    });
  }

  async sortPosts(posts: Post[] | IPost[]): Promise<Post[] | IPost[]> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  async deletePost(postId: string): Promise<void> {
    await this._db.prisma.post.delete({
      where: {
        id: postId
      }
    });
  }

  async getCommentsByPostId(postId: string): Promise<Comment[] | IComment[] | undefined> {
    return await this._db.prisma.comment.findMany({
      where: {
        postId: postId
      },
      include: {
        user: true
      }
    });
  }
}
