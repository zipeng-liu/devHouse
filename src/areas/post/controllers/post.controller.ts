import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts } from "../../../model/fakeDB";
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
    const user = req.user;
    await this._service.getAllPosts(user.id);
    res.render("post/views/posts", { posts: posts });
  };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    const postId = request.params.id;
    const post = await this._service.findById(postId);

    res.render("post/views/post", { post: post });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const { id, createdAt, userId, message } = req.body;
    const comment = { id, createdAt, userId, message }
    try {
      await this._service.addCommentToPost(comment, postId,);
      res.redirect("/posts/${postId}");
    } catch {
      res.status(404).send("Error")
    }

  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {};
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

export default PostController;
