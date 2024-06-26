//import { posts, userDatabase } from "../../../model/fakeDB";
import PostForm from "../../../components/PostForm";
import Header from "../../../components/shared/Header";
import { Html } from "../../../templates/html-tmpl";
import Feed from "../../../components/Feed";
import { Post } from "@prisma/client";


export default ({ posts, user }: { posts: Post[], user: any }) => {
  return (
    <Html>
      <div class="min-h-screen bg-gray-200 flex flex-col">
        <main class="flex-1 flex flex-col w-screen">
          <Header />
          <div class="w-full">
            <PostForm user={user}/>
            <Feed posts={posts} user={user} />
          </div>
        </main>
      </div>
    </Html>
  );
};

