import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";

const postsDB: IPost[] = [];
// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    
    postsDB.push(post);
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.

    throw new Error("Method not implemented.");
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    return postsDB.find((post) => post.postId === id);
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
