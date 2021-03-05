import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import path from "path";

class App {
  public app: express.Application;
  public port: number | string = process.env.PORT || 5000;

  constructor(controllers: Controller[]) {
    this.app = express();

    // this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.urlencoded());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  // private connectToTheDatabase() {
  //   const {
  //     MONGO_USER,
  //     MONGO_PASSWORD,
  //     MONGO_PATH,
  //   } = process.env;
  //   mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  // }
}

export default App;
