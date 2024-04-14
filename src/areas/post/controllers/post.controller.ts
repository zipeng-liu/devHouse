import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { User } from "@prisma/client";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _service: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._service = postService;
  }

  private initializeRoutes() {
    // this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/test`, this.getTest);
    this.router.get(`${this.path}/:id`, this.getPostById);
    // this.router.get(`${this.path}/:id/delete`, this.deletePost);
    // this.router.post(`${this.path}/:id/comment`, this.createComment);
    // this.router.post(`${this.path}`, this.createPost);
  }

  private getTest = async (req: Request, res: Response) => {
    try {
      // const username = req.user.username;
      const posts = await this._service.getAllTest();
      // res.render("post/views/posts", { posts });
      res.json(posts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = async (req: Request, res: Response) => {
    try {
      const username = req.user.username;
      const postall = await this._service.getAllTest();
      res.render("post/views/posts", { posts: postall, user: username });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  // private getAllPosts = async (req: Request, res: Response) => {
  //   try {
  //     const username = req.user.username;
  //     const posts = await this._service.getAllPosts(username);
  //     res.render("post/views/posts", { posts });
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = parseInt(req.params.id);
      const post = await this._service.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      res.render("post/views/post", { post });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  // private createPost = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { content, userId } = req.body;
  //     const post = await this._service.addPost({ content, userId }, userId);
  //     res.redirect(`${this.path}/${post.id}`);
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // };
  // private deletePost = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const postId = parseInt(req.params.id);
  //     await this._service.deletePost(postId);
  //     res.redirect(this.path);
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // };
}

export default PostController;
