import { Post } from "../model/Post";
import { database } from "../model/fakeDB";
import IPost from "../features/post/post.interface";

export class PostRepository {
  constructor() {}

  // addPost(post: Post, username: string): void {
  //   const { message, likes, createdAt, reposts, comments } = post;
  //   const id = "weiofjweo";
  //   database.users[username].posts.push({
  //     id,
  //     userId: "blah",
  //     message,
  //     createdAt,
  //     comments,
  //     likes,
  //     reposts,
  //   });
  // }

  // getPosts(username: string): IPost[] {
  //   return database.users[username].posts;
  // }
}
