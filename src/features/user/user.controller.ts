/*import PostNotFoundException from "../../exceptions/PostNotFoundException";
import { Request, Response, NextFunction, Router } from "express";
import Controller from "../../interfaces/controller.interface";
//import RequestWithUser from '../interfaces/requestWithUser.interface';
//import authMiddleware from "../middleware/auth.middleware";
//import validationMiddleware from '../middleware/validation.middleware';
//import CreatePostDto from './post.dto';
import PostModel from "./post.model";
import { PostViewModel } from "./post.viewmodel";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private post: PostModel;

  constructor() {
    this.initializeRoutes();
    this.post = new PostModel();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(`${this.path}`, this.createPost);
    // this.router.all(`${this.path}/*`, authMiddleware);
    // .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
    // .delete(`${this.path}/:id`, this.deletePost)
    // .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
  }

  private getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const post = await this.post.findById(id);
    if (post) {
      const singlePostViewModel = new PostViewModel(post);
      response.render("comments", { post: singlePostViewModel });
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private createPost = async (request: Request, response: Response) => {
    // const postData: CreatePostDto = request.body;
    let { postText } = request.body;
    this.post.addPost(
      {
        id: "oiewfk",
        createdAt: "dec 10 2020",
        userId: "john123",
        message: postText,
        comments: 0,
        likes: 0,
        reposts: 0,
      },
      "john123"
    );

    response.redirect("/posts");
  };

}

export default UserControler;
*/
