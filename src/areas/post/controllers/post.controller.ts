import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
//import { post, posts } from "../../../model/fakeDB";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import DBClient from "../../../PrismaClient";
import post from "../views/post";
import { IAuthenticationService } from "../../authentication/services";

class PostController implements IController {
  readonly _db: DBClient = DBClient.getInstance();

  public path = "/posts";
  public router = Router();
  private _service: IPostService;
  private _userservice: IAuthenticationService

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._service = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:postId`, this.getPostById);
    this.router.get(`${this.path}/:postId/delete`, this.deletePost);
    this.router.get(`/profiles`, this.getAllUsers);
    this.router.post(`${this.path}/:postId/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
    this.router.get(`/profile/:id`, ensureAuthenticated, this.follow)
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = async (req: Request, res: Response) => {
    const user = req.user;

    let isLogged = false;

    if (user) {
      isLogged = true;
      const username = user.username;
      const posts = await this._service.getAllPosts(user.username);
      res.render(`post/views/${this.path}`, { posts: posts, username: username, user: user, isLogged: isLogged });
    }
    const posts = await this._db.prisma.post.findMany()

    res.render(`post/views/${this.path}`, { posts: posts});
  };

  // 🚀 This methods should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postInfo = parseInt(req.params.postId, 10);
    const post = await this._service.findById(postInfo)
    res.render(`post/views/post`, { post: post, postId: postInfo});
  };

  private follow = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const idUser = user.id;
    const followingid = parseInt(req.params.id, 10);
    const followingUser = await this._db.prisma.user.findUnique({
      where: {
        id: followingid
      }
    })
      const following = await this._db.prisma.user.update({
          where: {
              id: idUser
          },
          data: {
              following:  {
                  connect: { id: followingUser.id },
                },
          },
      });

    res.redirect(`/profiles`);
  };

  private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const currentuser = req.user.id

    let isLogged = false;

    if (currentuser) {

      isLogged = true

      const allusers = await this._db.prisma.user.findMany({
      include: {
        followers: true,
        }
      })

      const users = allusers
      .filter(user => 
        user.id !== currentuser && 
        !(user.followers || []).some(follower => follower.id === currentuser)
      )
      .map(({ followers, ...userWithoutFollowers }) => userWithoutFollowers);

      res.render(`post/views/profiles`, { users: users, isLogged: isLogged});
    }
  };

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const {message, postId} = req.body;
    const newComment = await this._service.addCommentToPost(message, postId)

    res.redirect(`post/views/post`)
  };
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const user = req.user;
    const newPost = await this._service.addPost(data, user.id)
    const id = newPost.postId
    console.log(newPost)
    console.log("here is id ", id)

    res.redirect(`posts/${id}`)
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const id = parseInt(req.params.postId, 10)
    const deletePost = await this._db.prisma.post.delete({
      where: {
        postId: id,
      }
    })

    res.redirect(this.path)
  };
}

export default PostController;
