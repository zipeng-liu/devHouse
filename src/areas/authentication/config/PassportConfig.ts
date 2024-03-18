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
      async (email: any, password: any, done: any) => {
        // use FormValidater in here
        try {
          const user = await this._authenticationService.getUserByEmailAndPassword(email, password);
          if (!user) {
            return done(null, false, { message: "Email or password is incorrect"})
          }
          return done(null, user);
        } catch (error) {
          return done(error)
        }
      }
    );
    this.registerStrategy(passport);
    this.serializeUser(passport);
    this.deserializeUser(passport);
  }
  registerStrategy(passport: any) {
    passport.use(this._name, this._strategy);
  }
  private serializeUser(passport: any) {
    passport.serializeUser((user: any, done: any) => {
      done(null, user.id);
    });
  }
  private deserializeUser(passport: any) {
    passport.deserializeUser(async (id: any, done: any) => {
      try {
        const user = await this._authenticationService.getUserById(id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    });
  }
}
