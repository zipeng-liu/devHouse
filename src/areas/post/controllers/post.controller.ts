import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
//import { post, posts } from "../../../model/fakeDB";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _service: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._service = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const posts = await this._service.getAllPosts(userId);
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profilePicture: req.user.profilePicture
    }
    console.log(posts)
    console.log(user)
    res.render("post/views/posts", { posts: posts, user: user});
  };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const post = await this._service.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render("post/views/post", { post: post });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const message = req.body.data;
    console.log(req.body)
    await this._service.addPost(message, userId);
    res.redirect("/posts");
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

export default PostController;
