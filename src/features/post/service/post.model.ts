// import IPost from "./post.interface";
import IPost from "../post.interface";
import { database } from "../../../model/fakeDB";
import { IPostService } from "./IPostService";
import { nanoid } from "nanoid";

export class PostModel extends IPostService {
  addCommentToPost(
    message: {
      id: string;
      createdAt: string;
      userId: string; //   public reposts?: number
      //   public reposts?: number
      // ) {}
      // deserialize(post: IPost) {
      //   return new PostModel(
      //     post.id,
      //     post.createdAt,
      //     post.commentList,
      //     post.userId,
      //     post.message,
      //     post.comments,
      //     post.likes,
      //     post.reposts
      //   );
      // }
      message: string;
    },
    postId: string
  ): void | IPost {
    throw new Error("Method not implemented.");
  }
  // constructor(
  //   public id?: string,
  //   public createdAt?: Date,
  //   public commentList?: any,
  //   public userId?: string,
  //   public message?: string,
  //   public comments?: number,
  //   public likes?: number,
  //   public reposts?: number
  // ) {}

  // deserialize(post: IPost) {
  //   return new PostModel(
  //     post.id,
  //     post.createdAt,
  //     post.commentList,
  //     post.userId,
  //     post.message,
  //     post.comments,
  //     post.likes,
  //     post.reposts
  //   );
  // }

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
    });
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

  // getAllPosts(username: string): PostModel[] {
  //   // TODO: use DAO instead
  //   //return database.users[username].posts;
  //   return this.sortPosts(database.users[username].posts).map((post) => {
  //     return this.deserialize(post);
  //   });
  // }
  getAllPosts(username: string): IPost[] {
    // TODO: use DAO instead
    //return database.users[username].posts;
    return this.sortPosts(database.users[username].posts);
  }

  // findById(id: string): PostModel | undefined {
  //   // TODO: use DAO instead
  //   let postFound = undefined;
  //   for (const user in database.users) {
  //     let posts = database.users[user].posts;
  //     postFound = posts.find((obj) => obj.id === id);
  //   }
  //   if (postFound) {
  //     return this.deserialize(postFound);
  //   }
  //   return postFound;
  // }
  findById(id: string): IPost | undefined {
    // TODO: use DAO instead
    let postFound = undefined;
    for (const user in database.users) {
      let posts = database.users[user].posts;
      postFound = posts.find((obj) => obj.id === id);
    }
    return postFound;
  }
}
