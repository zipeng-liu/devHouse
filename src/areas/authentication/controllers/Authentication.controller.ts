import express, { Request, Response, NextFunction } from "express";
import IController from "../../../interfaces/controller.interface";
import passport from "passport";
import { IAuthenticationService } from "../services";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";

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
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login, (req, res) => {
      console.log("We hit here");
      console.log(req.user);
      res.redirect("/posts");
    });
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    // @ts-ignore
    const errorMessage = req.session.messages;
    res.render("authentication/views/login", { errorMessage });
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    // @ts-ignore
    const errorMessage = req.session.messages;
    res.render("authentication/views/register", { errorMessage });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/posts",
    failureMessage: true,
  });
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password, firstName, lastName,  } = req.body;

    try {
      const userEmailExists = await this.service.findUserByEmail(email);
      if (userEmailExists) {
        throw new EmailAlreadyExistsException(email);
      }
      await this.service.createUser({
        username: firstName,
        email,
        password,
        firstName,
        lastName,
      });
      res.redirect("/auth/login");
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
