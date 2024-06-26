"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.get("/photos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    let params;
    keyword
        ? (params = { format: "json", nojsoncallback: 1, tags: keyword })
        : (params = { format: "json", nojsoncallback: 1 });
    try {
        const response = yield axios_1.default.get("https://www.flickr.com/services/feeds/photos_public.gne", { params });
        const images = response.data.items.map((item) => ({
            title: item.title,
            link: item.link,
            media: item.media && item.media.m ? item.media.m : "",
            author: item.author,
        }));
        res.json(images);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing data from flickr" });
    }
}));
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map