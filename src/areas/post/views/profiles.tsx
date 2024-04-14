import PostForm from "../../../components/PostForm";
import Header from "../../../components/shared/Header";
import { Html } from "../../../templates/html-tmpl";
import Profile from "../../../components/Users";
import { Post, User } from "@prisma/client";

export default ({ users, isLogged }: { users: User[], isLogged: boolean}) => {
    return (
      <Html>
        <div class="h-screen bg-gray-200 w-screen">
          <main class="flex-1 flex flex-col w-screen">
            <Header isLogged={isLogged} />
            <form action="/posts"> 

              <div class="mt-4 flex flex-row justify-end">
                <button class="bg-sky-500 text-white rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed px-8 py-2">
                  Go to Posts
                </button>
              </div>

            </form>
            <div class="w-full">
              <Profile users={users} />
            </div>
          </main>
        </div>
      </Html>
    );
  };