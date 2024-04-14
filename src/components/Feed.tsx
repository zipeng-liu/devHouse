import User from "../interfaces/user.interface";
import IPost from "../interfaces/post.interface";
import PostItem from "./PostItem";
import { Post } from "@prisma/client";

// TODO: change any to be the prisma Post type
export const Feed = ({ posts, user }: { posts: Post[]; user: User }) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} user={user} />
      ))}
    </>
  );
};

export default Feed;
