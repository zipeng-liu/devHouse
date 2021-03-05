import IComment from "../../features/post/comment.interface";
import IPost from "../../features/post/post.interface";

export interface ISearch {
  usersFound: Array<IComment>;
  postsFound: Array<IPost>;
}
