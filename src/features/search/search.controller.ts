import PostNotFoundException from "../../exceptions/PostNotFoundException";
import { Request, Response, NextFunction, Router } from "express";
import Controller from "../../interfaces/controller.interface";
//import RequestWithUser from '../interfaces/requestWithUser.interface';
//import authMiddleware from "../middleware/auth.middleware";
//import validationMiddleware from '../middleware/validation.middleware';
//import CreatePostDto from './post.dto';
import SearchModel from "./search.model";
import { SearchViewModel } from "./search.viewmodel";
import { CommentViewModel } from "../../features/post/comment.viewmodel";
import { PostViewModel } from "../../features/post/post.viewmodel";

class SearchController implements Controller {
  public path = "/search";
  public router = Router();
  private search: SearchModel;

  constructor() {
    this.initializeRoutes();
    this.search = new SearchModel();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.searchUsersOrPosts);
    // this.router.all(`${this.path}/*`, authMiddleware);
    // .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
    // .delete(`${this.path}/:id`, this.deletePost)
    // .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
  }

  private searchUsersOrPosts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const searchQuery: string = request.query["query"]?.toString() || "";
    const resultSet = await this.search.searchUsersOrPosts(searchQuery);
    if (resultSet) {
      let userViewModel:
        | CommentViewModel[]
        | undefined = resultSet.usersFound?.map(
        (user) => new CommentViewModel(user)
      );
      let postViewModel:
        | PostViewModel[]
        | undefined = resultSet.postsFound?.map(
        (post) => new PostViewModel(post)
      );
      const searchViewModel = new SearchViewModel(postViewModel, userViewModel);
      response.render("search", { search: searchViewModel });
    } else {
      //next(new PostNotFoundException(id));
      console.log("error");
    }
  };
}

export default SearchController;
