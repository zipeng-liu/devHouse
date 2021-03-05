import { User } from "../model/User";
import { database } from "../model/fakeDB";

export class UserRepository {
  constructor() {}

  followUser(userToFollow: string, currentUser: string): void {
    console.log(database.users[currentUser].following);
    database.users[currentUser].following.push(userToFollow);
  }

  unfollowUser(userToUnfollow: string, currentUser: string): void {
    database.users[currentUser].following = database.users[
      currentUser
    ].following.filter((user) => user !== userToUnfollow);
    console.log(database.users[currentUser].following);
  }

  isFollowing(userToCheck: string, currentUser: string): boolean {
    console.log(database.users[currentUser].following);
    return database.users[currentUser].following.includes(userToCheck);
  }
}
