import IComment from "./comment.interface";

export class CommentViewModel {
  userId: string;
  createdAt: string;
  message: string;

  constructor(comment: IComment) {
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
    this.message = comment.message;
  }
}
