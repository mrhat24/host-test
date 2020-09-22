import {Request, Response} from 'express';
import {BlogService} from "../services/blogService";
import {getLogin} from "../utils/middlewares/auth";
import {getApiUrl, HttpCodes} from "../utils/api";
import {Routes} from "../routes";
import {successResponse} from "./helpers";

const blogService = new BlogService();

export class BlogController {

    public async create(req: Request, res: Response): Promise<void> {
        const blog = await blogService.create(req.body, getLogin(req.body));
        successResponse(res, blog, {
            headers: {location: getApiUrl(Routes.getBlog, {id: blog._id})},
            successCode: HttpCodes.Created
        });
    }

    public async update(req: Request, res: Response): Promise<void> {
        successResponse(res, await blogService.update(req.body,getLogin(req.body), req.params['id']));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await blogService.delete(req.params['id'], getLogin(req.body));
        successResponse(res);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const list = await blogService.list();
        successResponse(res, list);
    }

    public async get(req: Request, res: Response): Promise<void> {
        successResponse(res, await blogService.get(req.params['id']));
    }
}
