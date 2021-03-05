import { Post } from "./Post";

export class User {
  private posts: Post[] = [];
  constructor(private username: string, private password: string) {}
}
