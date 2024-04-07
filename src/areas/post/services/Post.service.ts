import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import type { User, Post, Comment } from "@prisma/client";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  addPost(post: IPost, username: string): Promise<void> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): Promise<Post | IPost[]> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Post | IPost | undefined> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): Promise<void> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): Promise<Post | IPost[]> {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
