// import IPost from "./post.interface";
import IPost from "../post.interface";
import { database } from "../../../model/fakeDB";
import { nanoid } from "nanoid";

export abstract class IPostService {
  abstract addPost(post: IPost, username: string): void;

  abstract sortPosts(posts: any): [];

  abstract getAllPosts(username: string): IPost[];

  abstract findById(id: string): IPost | undefined;

  abstract addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;
}
