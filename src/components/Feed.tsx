import IUser from "../interfaces/user.interface";
import IPost from "../interfaces/post.interface";
import {User, Post} from "@prisma/client";
import PostItem from "./PostItem";

export const Feed = ({ posts, user }: { posts: Post[] | IPost[]; user: any}) => {
  return (
    <>
      {posts.map((post: Post | IPost) => (
        <PostItem post={post} user={user} />
      ))}
    </>
  );
};

export default Feed;
