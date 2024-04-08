// import IUser from "../interfaces/user.interface";
// import IPost from "../interfaces/post.interface";
import {Post} from "@prisma/client";
import PostItem from "./PostItem";

export const Feed = ({ posts, user }: { posts: any; user: any}) => {
  return (
    <>
      {posts.map((post: any) => (
        <PostItem post={post} user={post.user} />
      ))}
    </>
  );
};

export default Feed;
