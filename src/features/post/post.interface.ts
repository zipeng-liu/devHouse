interface IComment {
  id: string;
  message: string;
  userId: string;
  createdAt: string;
}

interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  reposts: number;
  comments: number;
}

export default IPost;
