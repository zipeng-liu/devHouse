// import "dotenv/config";
import App from "./app";
import PostController from "./features/post/post.controller";
import { PostModel, PostModelMock } from "./features/post/service";
import SearchController from "./features/search/search.controller";
// import AuthenticationController from './authentication/authentication.controller';
// import ReportController from './report/report.controller';
// import UserController from "./features/"
//import validateEnv from './utils/validateEnv';

//validateEnv();

const app = new App([
  new PostController(new PostModelMock()),
  new SearchController(),
  // new AuthenticationController(),
  // new UserController(),
  // new ReportController(),
]);

app.listen();
