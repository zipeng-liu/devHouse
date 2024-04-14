import IUser from "../interfaces/user.interface";
import IPost from "../interfaces/post.interface";
import PostItem from "./PostItem";

export const Feed = ({ posts }: { posts: IPost[]}) => {
  return (
    <>
      {posts.map((post: IPost) => (
        <PostItem post={post} />
      ))}
    </>
  );
};

export default Feed;
