import IComment from "./comment.interface";
// import PostModel from "./post.model";
import IPost from "./post.interface";

export class PostViewModel {
  public postId;
  public userId;
  public createdAt;
  public message;
  public comments;
  public reposts;
  public likes;
  public commentList?: Array<IComment>;

  constructor(post: IPost) {
    this.postId = post.id;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.message = post.message;
    this.comments = post.comments?.toString();
    this.reposts = post.reposts?.toString();
    this.likes = post.likes?.toString();
    this.commentList = post.commentList;
  }
}
