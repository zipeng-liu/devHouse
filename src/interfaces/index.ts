import { PostModel } from "../features/post/service/post.model";
import IPost from "../features/post/post.interface";

// type NonFunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? never : K;
// }[keyof T];
// type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
// export interface post {
//   id: string;
//   message: string;
//   createdAt: string;
//   likes: number;
//   reposts: number;
//   comments: number;
// }

// export type IPost = NonFunctionProperties<PostModel>;

export interface user {
  username: string;
  posts: Array<IPost>;
  codeSnippets: Array<string>;
  following: Array<string>;
  reposts: Array<string>;
}

export interface db {
  users: {
    [key: string]: user;
  };
}
