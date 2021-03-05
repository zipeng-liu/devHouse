// import IPost from "./post.interface";
import { ISearch } from "./search.interface";
import { database } from "../../model/fakeDB";
import { nanoid } from "nanoid";
import IComment from "../../features/post/comment.interface";
import IPost from "../../features/post/post.interface";
// import PostModel from "../../features/post/post.model";

interface searchDto {
  usersFound: Array<IComment>;
  postsFound: Array<IPost>;
}

export default class SearchModel {
  constructor(
    public usersFound?: Array<IComment>,
    public postsFound?: Array<IPost>
  ) {}

  // deserialize(searchResults: ISearch) {
  //   let posts: PostModel[] = searchResults.postsFound.map(
  //     (post) =>
  //       new PostModel(
  //         post.id,
  //         post.createdAt,
  //         post.commentList,
  //         post.userId,
  //         post.message,
  //         post.comments,
  //         post.likes,
  //         post.reposts
  //       )
  //   );
  //   let users: IComment[] = searchResults.usersFound.map((user) => ({
  //     id: user.id,
  //     message: user.message,
  //     userId: user.userId,
  //     createdAt: "",
  //   }));
  //   return new SearchModel(users, posts);
  // }

  searchUsersOrPosts(searchQuery: string): searchDto {
    let posts: IPost[] = database.users["john123"].posts;
    let users: IComment[] = [
      { id: "3242", message: "wefw", userId: "wfew", createdAt: "woekfp" },
    ];

    let searchResult: searchDto = { postsFound: posts, usersFound: users };
    return searchResult;
    // return this.deserialize({ usersFound: users, postsFound: posts });
  }
}
