import { Html } from "../../../templates/html-tmpl.js";
import { Post } from "@prisma/client";
import { simplifyDateTime } from "../../../components/PostItem";

export default ({ post, comments }: { post: any, comments: any }) => {
  return (
    <Html>
      <div class="main-container">
        <section class="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
          <main class="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
            <header class="border-b-[1px] border-slate-200 dark:border-neutral-800 w-full p-5 bg-white">
              <div class="flex flex-row items-center gap-2">
                <h1 class="dark:text-white text-xl font-semibold">DevHouse</h1>
              </div>
            </header>
            <section class="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0">
              <div class="flex flex-col lg:flex-row h-full w-full">
                <div class="border pb-2 lg:pb-0 w-full lg:max-w-sm px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
                  <div class="w-full min-h-0 min-w-0 mb-4">
                    <div class="font-sans rounded border px-6 py-4 max-w-md">
                      <div class="flex items-center">
                        <img
                          src={post.user.profilePicture}
                          class="h-12 w-12 rounded-full"
                        />
                        <div class="flex flex-col ml-4">
                          <div class="font-bold text-black">
                            {post.user.firstName} {post.user.lastName}
                          </div>
                          <span class="text-grey">{post.user.username}</span>
                        </div>
                      </div>
                      <div class="mt-3 mb-1 leading-normal text-lg">{post.message}</div>
                      <div class="text-grey mb-3 text-sm">{`Created at ${simplifyDateTime(post.createdAt)}`}</div>
                      <div class="flex text-grey">
                        <div class="flex items-center mr-4">
                          <span>{`Comment ${post.comments}`}</span>
                        </div>
                        <div class="flex items-center">
                          <span>{`Like ${post.likes}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" w-full min-h-0 min-w-0 mb-4">
                    <div class="flex mx-auto items-center justify-center shadow-lg mt-25 mx-8 mb-4 max-w-lg">
                      <form
                        action={`/posts/${post.id}/comment`}
                        method="post"
                        class="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
                      >
                        <div class="flex flex-wrap -mx-3 mb-6">
                          <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                          <div class="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea
                              name="commentText"
                              class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                              placeholder="Type Your Comment"
                              required
                            ></textarea>
                          </div>
                          <div class="w-full md:w-full flex items-start md:w-full px-3">
                            <a href="/posts" class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                              Back
                            </a>
                            <div class="-mr-1">
                              <input
                                type="submit"
                                class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                value="Post Comment"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
                <div class="bg-gray-100 w-full h-full min-h-0 min-w-0 overflow-auto rounded-lg">
                  {comments.map((comment: any) => (
                    <div class="w-full h-34 mt-3">
                      <div class="flex items-center dark:bg-gray-800">
                        <div class="text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                          <img
                            class="rounded-full h-8 w-8 mr-2 mt-1 "
                            src={comment.user.profilePicture}
                          />
                          <div>
                            <div class="rounded-3xl bg-white px-4 pt-2 pb-2.5">
                              <div class="font-semibold text-sm leading-relaxed">{comment.user.firstName} {comment.user.lastName}</div>
                              <div class="text-normal leading-snug md:leading-normal"> {comment.message}</div>
                              <div class="text-normal leading-snug md:leading-normal"> Reply</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </section>
      </div>
    </Html>
  );
};
