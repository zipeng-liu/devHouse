import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IFollowService from "../services/IFollow.Service";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class FollowController implements IController {
  public path = "/follow";
  public router = Router();
  private _service: IFollowService;

  constructor(followService: IFollowService) {
    this._service = followService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, ensureAuthenticated, this.getFollowPage);
    this.router.get(`${this.path}/:id/follow`, this.followUser);
    this.router.get(`${this.path}/:id/unfollow`, this.unfollowUser);
  }

  private getFollowPage = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id; 
    const unfollowedUsers = await this._service.getUnfollowedUsers(userId);
    const followedUsers = await this._service.getFollowedUsers(userId);
    res.render("follow/views/follow", { unfollowedUsers: unfollowedUsers, followedUsers: followedUsers });
  };

  private followUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id; 
    const followedUserId = req.params.id; 
    console.log(followedUserId)
    await this._service.followUser(userId, followedUserId);
    res.redirect("/follow");
  }

  private unfollowUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id; 
    const followedUserId = req.params.id; 
    console.log(followedUserId)
    await this._service.unfollowUser(userId, followedUserId);
    res.redirect("/follow");
  }
}

export default FollowController;
