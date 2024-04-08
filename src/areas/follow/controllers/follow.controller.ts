import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IFollowService from "../services/IFollow.Service";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class FollowController implements IController {
  public path = "/follow";
  public router = Router();
  private _service: IFollowService;

  constructor(followService: IFollowService) {
    this.initializeRoutes();
    this._service = followService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, ensureAuthenticated, this.getFollowPage);
    this.router.post(`${this.path}/:id/follow`, this.getFollowPage);
    this.router.post(`${this.path}/:id/unfollow`, this.getFollowPage);
  }

  private getFollowPage = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id; 
    const unfollowedUsers = await this._service.getUnfollowedUsers(userId);
    const followedUsers = await this._service.getFollowedUsers(userId);
    res.render("follow/views/follow", { unfollowedUsers: unfollowedUsers, followedUsers: followedUsers });
  };


  async followUser(req: Request, res: Response): Promise<void> {
    const userId = req.user.id; // Assuming user ID is available in request after authentication
    const followedUserId = req.params.id; // Assuming followed user ID is passed in the URL parameter
    try {
      await this._service.followUser(userId, followedUserId);
      res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default FollowController;
