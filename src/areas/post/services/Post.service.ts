import DBClient from "../../../PrismaClient";
import IPost from "../../../interfaces/post.interface";
import IPostService, { PostDTO } from "./IPostService";
import { Prisma, PrismaClient } from "@prisma/client";
import IComment from "../../../interfaces/comment.interface";
import { create } from "node:domain";
import type { Post } from "@prisma/client";

//const prisma = new Prisma();
// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  
  async addPost(post: PostDTO, username: string): Promise<void> {
    // 🚀 Implement this yourself.
    try {
      await this._db.prisma.post.create({
        data: { //just a data object 
          content: post.message,
          userId: post.userId,
          message: post.message,
          createdAt: new Date(),
          likes: 0,
          // @ts-ignore           
         // comments: 0, // I got no idea what this error is
        }
      });
    } catch (error) {
      throw new Error(`Error adding post: ${error.message}`);
    }

  }
  async getAllPosts(username: string): Promise<Post[]>{
    // 🚀 Implement this yourself
    try {
      const posts = await this._db.prisma.post.findMany({// just grabs multiple posts with the condition
        where: {
          user: { username: username }
        },
        include: {
          comments:true // saw the ? meaning optional, 
        }
      });
      const formattedPosts: Post[] = posts.map(post => ({
        postId: post.id.toString(),
        message: post.message,
        userId: post.userId,
        createdAt: post.createdAt,
        commentList: post.comments, 
        likes: post.likes,
        comments: post.comments.length 
      }));
      return formattedPosts;
    } catch (error) {
      throw new Error(`Error getting posts: ${error.message}`);
    }
  }
  async findById(id: number): Promise<Post> {
    // 🚀 Implement this yourself.
    return await this._db.prisma.post.findUnique({
      where: {
        postId: id,
      }
    });
    // const formattedPost: IPost = {
    //   postId: post.id.toString(),
    //   message: post.message,
    //   userId: post.userId.toString(),
    //   createdAt: post.createdAt,
    //   commentList: post.comments,
    //   likes: post.likes,
    //   comments: post.comments.length
    // };

  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): IPost | void {
    // 🚀 Implement this yourself.
    return this._db.prisma.post.create({
      where: { 
        id: postId,
        message: message
      }
    })
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    return this._db.prisma.post.findMany({
      posts: posts,
      orderBy: {
        posts
      }
    })
  }
}
