"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Card_js_1 = require("./model/Card.js");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// Configure Express to use EJS
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: true }));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
    let card = new Card_js_1.Card("mock title", "mock description", "www.theverge.com");
    await card.generateImage();
    res.render("index", {
        cardList: [
            {
                cardTitle: card.cardTitle,
                cardDescription: card.cardDescription,
                cardImage: "http://free.pagepeeker.com/v2/thumbs.php?size=x&url=https%3A%2F%2Fdev.to",
            },
        ],
    });
});
app.get("/addSite", (req, res) => {
    res.render("addSite");
});
app.get("/test", (req, res) => {
    let { cardTitle, cardDescription, cardUrl } = req.body;
    // let card = new Card("mock title", "mock description", "www.theverge.com");
    // return res.render()
});
app.listen(5000, () => {
    console.log("server running on port 5000");
});
//# sourceMappingURL=server.js.map