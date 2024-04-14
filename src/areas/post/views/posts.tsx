//import { posts, userDatabase } from "../../../model/fakeDB";
import PostForm from "../../../components/PostForm";
import Header from "../../../components/shared/Header";
import { Html } from "../../../templates/html-tmpl";
import Feed from "../../../components/Feed";
import { Post, User } from "@prisma/client";
import IPost from "../../../interfaces/post.interface";

export default ({ posts, username, user, postId, isLogged }: { posts: IPost[], username: string, user: User, postId: any, isLogged: boolean}) => {
  return (
    <Html>
      <div class="h-screen bg-gray-200 w-screen">
        <main class="flex-1 flex flex-col w-screen">
          <Header username={username} />
          <div class="w-full">
          <form action="/profiles"> 

          <div class="mt-4 flex flex-row justify-end">
            <button class="bg-sky-500 text-white rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed px-8 py-2">
              Go to Profiles
            </button>
          </div>

          </form>
            <PostForm postId={postId} />
            <Feed posts={posts} />
          </div>
        </main>
      </div>
    </Html>
  );
};
