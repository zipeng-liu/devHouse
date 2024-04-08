import express from "express";

export const ensureAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

export const forwardAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/posts");
};

export const setCurrentUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    res.locals.currentUser = req.user;
  }
  next();
};

