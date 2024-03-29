"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const post_controller_1 = __importDefault(require("./areas/post/controllers/post.controller"));
const Authentication_controller_1 = __importDefault(require("./areas/authentication/controllers/Authentication.controller"));
const services_1 = require("./areas/post/services");
const Landing_controller_1 = __importDefault(require("./areas/landing/controllers/Landing.controller"));
const Authentication_service_1 = require("./areas/authentication/services/Authentication.service");
const server = new app_1.default([
    new Landing_controller_1.default(),
    new post_controller_1.default(new services_1.PostService()),
    new Authentication_controller_1.default(new Authentication_service_1.AuthenticationService()),
    // new SettingController(new SettingService()),
]);
server.start();
//# sourceMappingURL=server.js.map