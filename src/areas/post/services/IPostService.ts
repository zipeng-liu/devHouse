import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost, username: string): Promise<void>;

  sortPosts(posts: IPost[]): Promise<IPost[]>;

  getAllPosts(username: string): Promise<IPost[]>;

  findById(id: string): Promise<IPost | undefined>;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;
}
