import PostNotFoundException from "../../exceptions/PostNotFoundException";
import { Request, Response, NextFunction, Router } from "express";
import Controller from "../../interfaces/controller.interface";
//import RequestWithUser from '../interfaces/requestWithUser.interface';
//import authMiddleware from "../middleware/auth.middleware";
//import validationMiddleware from '../middleware/validation.middleware';
//import CreatePostDto from './post.dto';
import { PostViewModel } from "./post.viewmodel";
import IPost from "./post.interface";
import { IPostService } from "./service/IPostService";
import { nanoid } from "nanoid";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
    // this.router.all(`${this.path}/*`, authMiddleware);
    // .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
    // .delete(`${this.path}/:id`, this.deletePost)
    // .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
  }

  private getAllPosts = async (_: Request, res: Response) => {
    const postsFromDb: IPost[] = await this.postService.getAllPosts("john123");
    const posts = postsFromDb.map((post) => new PostViewModel(post));
    res.render("newsfeed", { posts });
  };

  private getPostById = async (
    request: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    console.log("hey");
    console.log(id);
    const post = await this.postService.findById(id);
    if (post) {
      const singlePostViewModel = new PostViewModel(post);
      res.render("comments", { post: singlePostViewModel });
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { commentText } = req.body;
    await this.postService.addCommentToPost(
      {
        id: "wopefk",
        createdAt: "wef",
        userId: "john123",
        message: commentText,
      },
      req.params.id
    );

    this.getPostById(req, res, next);
  };

  private createPost = async (req: Request, res: Response) => {
    // const postData: CreatePostDto = request.body;
    let { postText } = req.body;
    this.postService.addPost(
      {
        id: nanoid(),
        message: postText,
        userId: "john123",
        createdAt: new Date(),
        commentList: [],
        likes: 0,
        reposts: 0,
        comments: 0,
      },
      "john123"
    );

    const postsFromDb: IPost[] = await this.postService.getAllPosts("john123");
    const posts = postsFromDb.map((post) => new PostViewModel(post));
    res.render("newsfeed", { posts });
  };

  /*

  private modifyPost = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const postData: Post = request.body;
    const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
    if (post) {
      response.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  }



  private deletePost = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const successResponse = await this.post.findByIdAndDelete(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new PostNotFoundException(id));
    }
  }
  */
}

export default PostController;
