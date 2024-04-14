import IComment from "./comment.interface";

interface IPost {
  postId: number;
  content: string;
  userId: number;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  comments: string;
  message: string;
}

export default IPost;
