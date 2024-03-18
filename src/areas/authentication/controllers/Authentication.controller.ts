import express, { Request, Response, NextFunction } from "express";
import IController from "../../../interfaces/controller.interface";
import passport from "passport";
import { IAuthenticationService } from "../services";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  private service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this.service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
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
  private login = (req: express.Request, res: express.Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/auth/login");
      } else if (!user) {
        req.flash("error", info.message);
        return res.redirect("/auth/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/dashboard");
        }
        return res.redirect("/");
      });
    })(req, res, next);
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password } = req.body;

    try {
      const userEmailExists = await this.service.findUserByEmail(email);
      if (userEmailExists) {
        throw new EmailAlreadyExistsException(email);
      }
    } catch (error) {
      next(error);
    }
    console.log(req.body.email);
  };
  private logout = async (req: express.Request, res: express.Response) => {
    req.logout((err) => {
      if (err) console.log(err);
    });
    res.redirect("/");
  };
}

export default AuthenticationController;
