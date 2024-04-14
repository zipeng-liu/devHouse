import IComment from "./comment.interface";
import IUser from "./user.interface";

interface IPost {
  postId: number;
  message: string;
  userId: number;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  comments: number;
  user: IUser;
}

export default IPost;
