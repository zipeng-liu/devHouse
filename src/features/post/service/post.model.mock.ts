// import IPost from "./post.interface";
import IPost from "../post.interface";
import { database } from "../../../model/fakeDB";
import { IPostService } from "./IPostService";
import { nanoid } from "nanoid";

export class PostModelMock extends IPostService {
  addPost(post: IPost, username: string): void {
    const { message, likes, createdAt, reposts, comments } = post;

    let userId = username;
    let id = nanoid();
    let createdDate = new Date();
    database.users[username].posts.push({
      id,
      userId,
      message,
      createdAt: createdDate,
      comments,
      likes,
      reposts,
      commentList: [
        {
          id: "abc4",
          createdAt: "2012-01-05T04:13:24Z",
          userId: "john123",
          message: "some post some message blah some post some message blah",
        },
      ],
    });
  }

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): void {
    console.log(database.users[message.userId].posts);
    console.log(postId);
    let post = database.users[message.userId].posts.find(
      (p) => p.id === postId
    );
    console.log(post);
    post?.commentList?.push(message);
  }

  sortPosts = function (posts: any): [] {
    return posts.sort(function (a: any, b: any) {
      var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  };

  getAllPosts(username: string): IPost[] {
    // TODO: use DAO instead
    //return database.users[username].posts;
    return this.sortPosts(database.users[username].posts);
  }

  findById(id: string): IPost | undefined {
    // TODO: use DAO instead
    let postFound = undefined;
    for (const user in database.users) {
      if (postFound) {
        return postFound;
      }
      let posts = database.users[user].posts;
      console.log(posts);
      console.log(id);
      postFound = posts.find((obj) => obj.id === id);
    }
    return postFound;
  }
}
