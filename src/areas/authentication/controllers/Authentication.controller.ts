import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService, MockAuthenticationService } from "../services";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
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
    if(getUser) {
      // call passport here
      res.redirect("/posts")
    } else {
      const errormessage = "Invalid email or password"
     // next(errormessage)
      res.redirect(`${this.path}/login?error=${errormessage}`)
    }
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {};
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;
