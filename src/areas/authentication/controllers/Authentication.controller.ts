import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService, MockAuthenticationService } from "../services";

// dont use IAuth yet, use mockAuth
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
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    const errorMessage =  ""
    res.render("authentication/views/register", { errorMessage });
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
      console.log(error)
     }
//dont need to call new mock as in services there is 
//DELETE EVERYTHING HERE, authenticationController is recieving the mockauth
//do this beneath
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password, firstName, lastName } = req.body;
    const username = firstName;

    try {
        const user = await this._service.createUser({ email, password, username, firstName, lastName });
        res.status(200).send({ message: "Created user:", user });
        
    } catch (error) {
        next(error);
    }
  };

  private logout = async (req: express.Request, res: express.Response) => {
    req.logOut;
  };
}

export default AuthenticationController;
