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
    await this._service.getAllPosts(user.username);
    res.render("post/views/posts", { posts: posts });
  };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postInfo = req.body;
    const post = await this._service.findById(postInfo.postId)
    res.render("post/views/post", { post: posts[0] });
  };

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const {message, postId} = req.body;
    const newComment = await this._service.addCommentToPost(message, postId)
    res.redirect("post/views/posts")
  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const user = req.user;
    const newPost = this._service.addPost(data, user.id)
    res.redirect("post/view/posts")
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
  };
}

export default PostController;
