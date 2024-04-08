import {Post} from "@prisma/client";
import FollowUserItem from "./FollowUserItem";
import UnfollowUserItem from "./UnfollowUserItem";

export const FollowFeed = ({ followedUsers, unfollowedUsers }: { followedUsers: any; unfollowedUsers: any}) => {
  return (
    <>
      <div>
        <h1 class="text-2xl font-semibold mb-3 pl-8 mt-4 text-gray-800">Followed Users:</h1>
        {followedUsers.map((followedUser: any) => (
          <FollowUserItem user={followedUser} />
        ))}
      </div>
   
      <div>
        <h1 class="text-2xl font-semibold mb-3 pl-8 mt-4 text-gray-800">Discover More Users:</h1>
        {unfollowedUsers.map((unfollowedUser: any) => (
          <UnfollowUserItem user={unfollowedUser} />
        ))}
      </div>
    </>
  );
};

export default FollowFeed;