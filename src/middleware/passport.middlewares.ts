import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import { setCurrentUser } from "./authentication.middleware";
import { MockAuthenticationService } from "../areas/authentication/services/Authentication.service.mock";
import express = require("express");

// TODO: Replace any with the correct type
module.exports = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  new PassportConfig("local", new MockAuthenticationService());
  app.use(setCurrentUser);
};
