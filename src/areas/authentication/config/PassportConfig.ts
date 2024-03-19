//----------------------------------------
// TODO:                                 |
//----------------------------------------
// Configure Passport.js Local Authentication in this file
// I have written some code to help you get started, and you need to
// finish it off 🚀 Make sure to replace the "any" type.

import IUser from "../../../interfaces/user.interface";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IAuthenticationService, UserDTO } from "../services/IAuthentication.service";
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
      async (email: string, password: string, done: (error: any, user?: false | Express.User) => void) => {
        // use FormValidater in here
        try {
          const validationResult = FormValidater.IsEmpty(email);
          if (!validationResult) {
            return done(null, false);
          }

          const user = await this._authenticationService.getUserByEmailAndPassword(email, password);
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    );
    this.registerStrategy(passport);
  }

  registerStrategy(passport: typeof import('passport')) {
    passport.use(this._name, this._strategy);
    this.serializeUser(passport);
    this.deserializeUser(passport);
  }

  private serializeUser(passport: typeof import('passport')) {
    passport.serializeUser((user: UserDTO, done: (err: any, id?: unknown) => void) => {
      done(null, user.id);
    });
  }

  private deserializeUser(passport: typeof import('passport')) {
    passport.deserializeUser(async (id: string, done: (err: any, user?: false | Express.User) => void) => {
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
