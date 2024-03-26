import IPost from "../../../interfaces/post.interface";
import IPostService, { PostDTO } from "./IPostService";
import { Prisma, PrismaClient } from "@prisma/client";
import DBClient from "../../../PrismaClient";
import IComment from "../../../interfaces/comment.interface";
import { create } from "node:domain";
import type { Post } from "@prisma/client";

//const prisma = new Prisma();

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  // private prisma = DBClient.getInstance().prisma;
  
  async addPost(post: PostDTO, userId: number): Promise<Post> {
    const newPost: Post = {
      ...post,
      userId: userId
    };
    await this._db.prisma.post.create({
      data: newPost,
    });

    return newPost;
  }
  async getAllPosts(username: string): Promise<Post[]> {
    const user = await this._db.prisma.user.findUnique({
      where: {
        username: username
      }
    })
    if (user) {
      return await this._db.prisma.post.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "asc"
        }
      })
    }
    return
  }
  async findById(id: number): Promise<Post> {
    return await this._db.prisma.post.findUnique({
      where: {
        postId: id
      }
    })
  }
  async addCommentToPost(message: string, postId: number): Promise<void> {
    // 🚀 Implement this yourself.
    //throw new Error("Method not implemented.");
    const newComment = await this._db.prisma.comment.create({data: {
     message, 
     postId: postId
    }});
    // const post = await this.findById(postId);
    // return await this._db.prisma.post.update({
    //   where: {
    //     postId: post.postId,
    //   },
    //   data: {
    //     commentList: newComment,
    //   },
    // });
  }

  // async sortPosts(posts: Post[]): Promise<Post[]> {
  //   return await this._db.prisma.post.findMany({
  //     orderBy: {
  //       createdAt: "asc"
  //     }
  //   })
  // }
}
