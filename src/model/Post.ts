export class Post {
  constructor(
    private _message: string,
    private _createdAt: string,
    private _likes: number,
    private _reposts: number,
    private _comments: number
  ) {}

  get message() {
    return this._message;
  }

  get createdAt() {
    return this._createdAt;
  }

  get likes() {
    return this._likes;
  }

  get reposts() {
    return this._reposts;
  }
  get comments() {
    return this._comments;
  }
}
