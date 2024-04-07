//----------------------------------------
// TODO:                                 |
//----------------------------------------
// Configure Passport.js Local Authentication in this file
// I have written some code to help you get started, and you need to
// finish it off 🚀 Make sure to replace the "any" type.

import IUser from "../../../interfaces/user.interface";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IAuthenticationService } from "../services/IAuthentication.service";
import FormValidater from "../../../helper/FormValidator";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export default class PassportConfig {
  private _name: string;
  private _strategy: LocalStrategy;
  private _authenticationService: IAuthenticationService;

  constructor(name: string, authenticationService: IAuthenticationService) {
    this._authenticationService = authenticationService;
    this._name = name;
    this._strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email: string, password: string, done: any) => {
        // use FormValidater in here
        if (FormValidater.IsEmpty(email) || FormValidater.IsEmpty(password)) {
          return done(null, false, { message: "Email or password cannot be empty." });
        }
        try {
          const user = await this._authenticationService.getUserByEmailAndPassword(email, password);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid email or password." });
          }
        } catch (error) {
          return done(error);
        }
      }
    );
    this.registerStrategy(passport);
  }

  registerStrategy(passport: passport.PassportStatic) {
    passport.use(this._name, this._strategy);
    this.serializeUser(passport);
    this.deserializeUser(passport);
  }
  
  private serializeUser(passport: passport.PassportStatic) {
    passport.serializeUser((user: Express.User, done) => {
      done(null, user.id.toString());
    });
  }

  private deserializeUser(passport: passport.PassportStatic) {
    passport.deserializeUser((id: string, done) => {
      this._authenticationService
        .getUserById(id)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          done(null, user);
        })
        .catch((error) => done(error));
    });
  }
}