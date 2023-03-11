import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private postService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.createPost);
    }

    private createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.postService.createPost(title, body);
            res.status(201).json({ post });
        } catch (err: any) { next(new HttpException(400, err.message)) }
    }
}

export default PostController;