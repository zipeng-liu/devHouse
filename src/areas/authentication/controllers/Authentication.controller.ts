import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService, MockAuthenticationService } from "../services";
import passport from "passport";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  private _service: IAuthenticationService

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const error = req.query["errormessage"]; // invalid
    if (error) {
      res.render("authentication/views/login", {error});
    } else {
    res.render("authentication/views/login");

    }
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };


  // 🔑 These Authentication methods needs to be implemented by you
  private login = async (req: express.Request, res: express.Response, next) => {
    passport.authenticate( "local", {
      successRedirect: "/posts",
      failureRedirect: "/auth/login",
      failureMessage: true }, (err: any, user: Express.User | false, info: any) => {
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
      }
    )(req, res, next);
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password, firstName, lastName } = req.body;
    const username = `${firstName}geek`

    try {
      const user = await this._service.findUserByEmail(email);
      if (user) {
        throw new EmailAlreadyExistsException(email);
      }
      const newUser = await this._service.createUser({email: email, password: password, firstName: firstName, lastName: lastName, username: username});
      console.log("New user was created")
    } catch (error) {
      next(error);
    }
  };
  private logout = async (req: express.Request, res: express.Response) => {
    req.logOut((err) => {
      if(err) {
        console.log("when you tried to logout an error occured", err)
      }
    })
    res.redirect('/auth/login')
  };
}

export default AuthenticationController;
