"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
class Card {
    constructor(_cardTitle, _cardDescription, _cardUrl) {
        this._cardTitle = _cardTitle;
        this._cardDescription = _cardDescription;
        this._cardUrl = _cardUrl;
    }
    async generateImage() {
        const url = `https://api.screenshotmachine.com/?key=c4d692&url=${this._cardUrl}&dimension=1024x768`;
        const data = await axios_1.default.get(url);
        await fs_1.promises.writeFile("../public/img.jpeg", data.data);
        console.log("done");
    }
    get cardTitle() {
        return this._cardTitle;
    }
    get cardDescription() {
        return this._cardDescription;
    }
    get cardUrl() {
        return this._cardUrl;
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map