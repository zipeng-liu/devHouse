import Header from "../../../components/shared/Header";
import { Html } from "../../../templates/html-tmpl";
import FollowFeed from "../../../components/FollowFeed";
import { Post } from "@prisma/client";


export default ({ followedUsers, unfollowedUsers }: { followedUsers: any; unfollowedUsers: any}) => {
  return (
    <Html>
      <div class="min-h-screen bg-gray-200 flex flex-col">
        <main class="flex-1 flex flex-col w-screen">
          <Header />
          <div class="w-full">
            <FollowFeed followedUsers={followedUsers} unfollowedUsers={unfollowedUsers} />
          </div>
        </main>
      </div>
    </Html>
  );
};