import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  private _service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, forwardAuthenticated, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
      const user = await this._service.getUserByEmailAndPassword(email, password);
      if (user) {
        res.redirect("/posts")
      } else {
        const errorMessage = "Invalid email or password";
        res.render("authentication/views/login", { errorMessage });   
      }
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  };

  private logout = async (req: express.Request, res: express.Response) => {

  };
}

export default AuthenticationController;
