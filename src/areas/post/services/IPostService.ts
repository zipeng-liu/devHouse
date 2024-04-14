import IPost from "../../../interfaces/post.interface";

import type { Post } from "@prisma/client";
export type PostDTO = Omit<Post, "id">;

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: PostDTO, userId: number): Promise<Post>;

  // sortPosts(posts: Post): Promise<Post[]>;

  getAllPosts(username: string): Promise<Post[]>;

  getAllTest(): Promise<Post[]>;

  findById(id: number): Promise<Post | undefined>;

  // addCommentToPost(id: number, createdAt: string, userId: number, message: string, postId: number): Promise<Post>;
}
