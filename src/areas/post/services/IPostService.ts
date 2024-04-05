import IPost from "../../../interfaces/post.interface";

import type { Post } from "@prisma/client";
export type PostDTO = Omit<Post, "id">;

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: PostDTO, username: string): Promise<void>;

  sortPosts(posts: Post): Promise<Post[]>;

  getAllPosts(username: string): Promise<Post[]>;

  findById(id: number): Promise<Post | undefined>;

  addCommentToPost(message: string, postId: number): Promise<void>;
}
