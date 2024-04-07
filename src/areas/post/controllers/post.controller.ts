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
    if (req.user) {
      const userId = req.user.id;
      try {
        const post = await this._service.getAllPosts(req.user.username);
        console.log(post);
        if (!post) {
          res.status(404).send("Post not found");
          return;
        }
        res.render("post/views/posts", { posts: post });
      } catch (error) {
        console.log(error);
      }
      console.log(`User ID: ${userId}`);
    }
  };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id
    console.log(postId);
    try {
      const post = await this._service.findById(postId);
      if (!post) {
        res.status(404).send("Post not found");
        return;
      }
      res.render("post/views/post", { post: post });
    } catch (error) {
      next(error);
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const {createdAt, userId, message } = req.body;
    const id = req.user.id;
    const comment = { id, createdAt, userId, message }
    try {
      await this._service.addCommentToPost(comment.message, postId,);
      res.redirect(`/posts/${postId}`);
    } catch {
      res.status(404).send("Error")
    }

  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id
      const message  = req.body.data;
      const data = {
        content: message,
        userId: userId,
        message: `A new post has been created by ${req.user.username}`,
        createdAt: new Date(),
        likes: 0,
      } 
      console.log(data);
      await this._service.addPost(data, userId); 
      res.redirect("/posts");
    } catch (error) {
      next(error);
    }
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
     // await this._service.deletePost(postId);
      res.redirect("/posts");
    } catch (error) {
      next(error); 
    }
  };
}

export default PostController;
