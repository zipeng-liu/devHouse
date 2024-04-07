import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import type { User, Post, Comment } from "@prisma/client";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(message: string, username: string): Promise<void>;

  sortPosts(posts: Post[] | IPost[]): Promise<Post[] | IPost[]>;

  getAllPosts(username: string): Promise<Post[] | IPost[]>;

  findById(id: string): Promise<Post | IPost | undefined>;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): Promise<void>;

  deletePost(postId: string): Promise<void>;
}
