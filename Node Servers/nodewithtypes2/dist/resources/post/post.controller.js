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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("@/middlewares/validation.middleware"));
const post_validation_1 = __importDefault(require("@/resources/post/post.validation"));
const post_service_1 = __importDefault(require("@/resources/post/post.service"));
class PostController {
    constructor() {
        this.path = '/posts';
        this.router = (0, express_1.Router)();
        this.postService = new post_service_1.default();
        this.createPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, body } = req.body;
                const post = yield this.postService.createPost(title, body);
                res.status(201).json({ post });
            }
            catch (err) {
                next(new http_exception_1.default(400, err.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(post_validation_1.default.create), this.createPost);
    }
}
exports.default = PostController;
