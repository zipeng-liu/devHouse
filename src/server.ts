import App from "./app";
import PostController from "./areas/post/controllers/post.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";
import LandingController from "./areas/landing/controllers/Landing.controller";
import SettingController from "./areas/settings/controllers/setting.controller";
import { SettingService } from "./areas/settings/services";
import { AuthenticationService } from "./areas/authentication/services";

const server = new App([
  new LandingController(),
  new PostController(new MockPostService()),
  new AuthenticationController(new MockAuthenticationService()),
  // new SettingController(new SettingService()),
]);

server.start();
