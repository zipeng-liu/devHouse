"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const post_controller_1 = __importDefault(require("./areas/post/controllers/post.controller"));
const Authentication_controller_1 = __importDefault(require("./areas/authentication/controllers/Authentication.controller"));
// import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
// import { MockPostService } from "./areas/post/services";
const services_1 = require("./areas/post/services");
const Landing_controller_1 = __importDefault(require("./areas/landing/controllers/Landing.controller"));
const setting_controller_1 = __importDefault(require("./areas/settings/controllers/setting.controller"));
const services_2 = require("./areas/settings/services");
const services_3 = require("./areas/authentication/services");
const follow_controller_1 = __importDefault(require("./areas/follow/controllers/follow.controller"));
const services_4 = require("./areas/follow/services");
const server = new app_1.default([
    new Landing_controller_1.default(),
    // new PostController(new MockPostService()),
    new post_controller_1.default(new services_1.PostService()),
    //new AuthenticationController(new MockAuthenticationService()),
    new Authentication_controller_1.default(new services_3.AuthenticationService()),
    new setting_controller_1.default(new services_2.SettingService()),
    new follow_controller_1.default(new services_4.FollowService())
]);
server.start();
//# sourceMappingURL=server.js.map