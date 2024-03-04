import IComment from "./comment.interface";

interface IPost {
  postId: string;
  message: string;
  userId: string;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  comments: number;
}

export default IPost;
