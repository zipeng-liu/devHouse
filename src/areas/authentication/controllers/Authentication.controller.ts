import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    userID: { [id: string ]: string };
    messages: string[];
  }
}

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  private _service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const errorMessage = req.session.messages || null;
    console.log(errorMessage);
    req.session.messages = null;
    res.render("authentication/views/login", { errorMessage });
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    const errorMessage = req.session.messages || null;
    console.log(errorMessage);
    req.session.messages = null;
    res.render("authentication/views/register", { errorMessage });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err: { message: string; }, user: Express.User, info: { message: string; }) => {
      if (err) {
        req.session.messages = [err.message];
        return res.redirect('/auth/login');
      }
      if (!user) {
        req.session.messages = [info.message]; 
        return res.redirect('/auth/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          req.session.messages = [err.message];
          return res.redirect('/auth/login');
        }
        return res.redirect('/posts');
      });
    })(req, res, next);
  };


  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
  };


  private logout = async (req: express.Request, res: express.Response) => {
    req.logout((err) => {
      if (err) { 
        console.log(err);
      }
    });
    res.redirect("/");
  };
}

export default AuthenticationController;
