//----------------------------------------
// TODO:                                 |
//----------------------------------------
// Configure Passport.js Local Authentication in this file
// I have written some code to help you get started, and you need to
// finish it off 🚀 Make sure to replace the "any" type.

import IUser from "../../../interfaces/user.interface";
import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { IAuthenticationService } from "../services/IAuthentication.service";
import FormValidater from "../../../helper/FormValidator";
import { User } from "@prisma/client";

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
      //TODO
      async (email: string, password: string, done: (err: any, user: User) => void) => {
        const valid = FormValidater.IsEmpty(email);
        if(valid) {
          done({message: "Fill the fields"}, null)
        }
        const getUser = await this._authenticationService.getUserByEmailAndPassword(email, password);
        if(getUser) {
          done(null, getUser);
        }
      }
    );
    this.registerStrategy(passport);
    this.serializeUser(passport);
    this.deserializeUser(passport);
  }

  //TODO to make login work
  registerStrategy(passport: PassportStatic) { passport.use(this._name, this._strategy) }
  private serializeUser(passport: PassportStatic) { passport.serializeUser(function(user: Express.User, done: (err: any, id?: string) => void) {
    done(null, user.id);
  })}
  private deserializeUser(passport: PassportStatic) { passport.deserializeUser(function(id, done) {
      const user = this._authenticationService.getUserById(id)
      if(user) {
        done(null, user);
      } else {
        done({ message: "User not found" }, null);
      }     
    }); 
  }
}
