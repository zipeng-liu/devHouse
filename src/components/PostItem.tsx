import { Post } from "@prisma/client";
import IUser from "../interfaces/user.interface";

interface IPostAndUserType {
  post: Post;
  user: IUser;
}

export const PostItem = ({ post, user }: IPostAndUserType) => {
  return (
    <div class="mx-5 rounded mt-5 bg-white border-b-[1px] p-10 cursor-pointer border-slate-200 hover:bg-gray-100 transition relative">
      <div class="flex flex-row items-center gap-3 cursor-pointer">
        <img class="w-10 h-10 rounded-full" src={user.profilePicture} alt="Rounded avatar" />

        <div class="w-full">
          <div class="flex flex-row items-center gap-20 justify-between">
            <p class="dark:text-black font-semibold cursor-pointer hover:underline">{user}</p>
            <span class="text-neutral-500 text-sm">5 days ago</span>
          </div>

          <div class="dark:text-black mt-1">{post.content}</div>

          <div class="flex flex-row items-center mt-3 gap-10">
            <div class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              Comment
            </div>

            <div
              class={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
            >
              Like
              <p>{post.likes || 0}</p>
            </div>

            <div
              class={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
