import IComment from "../post/comment.interface";
// import PostModel from "./post.model";
import { PostViewModel } from "../../features/post/post.viewmodel";
import { CommentViewModel } from "../../features/post/comment.viewmodel";

export class SearchViewModel {
  public posts;
  public users;

  constructor(posts?: Array<PostViewModel>, users?: Array<CommentViewModel>) {
    this.posts = posts;
    this.users = users;
  }
}
