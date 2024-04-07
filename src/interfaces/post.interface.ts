import IComment from "./comment.interface";

interface IPost {
  postId: number;
  message: string;
  userId: number;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  comments: IComment[];
}

export default IPost;
