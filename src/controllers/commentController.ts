import {Request, Response} from "express";
import {getLogin} from "../utils/middlewares/auth";
import {CommentService} from "../services/commentService";
import {getApiUrl} from "../utils/api";
import {Routes} from "../routes";
import {HandledError} from "../utils/handledError";
import {successResponse} from "./helpers";
import {HttpCodes} from "../utils/http";

const commentService = new CommentService();

export class CommentController {
    public async create(req: Request, res: Response): Promise<void> {
        const {blogId} = req.params;
        const comment = await commentService.create(req.body, getLogin(req.body), blogId);
        successResponse(res, comment, {
            headers: {
                location: getApiUrl(Routes.getComment, {
                    id: comment._id,
                    blogId: blogId,
                })
            },
            successCode: HttpCodes.Created,
        });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id, blogId} = req.params;
        await commentService.delete(blogId, id, getLogin(req.body));
        successResponse(res);
    }

    public async update(req: Request, res: Response): Promise<void> {
        successResponse(res, await commentService.update(req.body, getLogin(req.body), req.params['blogId'], req.params['id']));
    }

    public async list(req: Request, res: Response): Promise<void> {
        const list = await commentService.list(req.params['blogId']);
        successResponse(res, list);
    }

    public async get(req: Request, res: Response): Promise<void> {
        const comment = await commentService.get(req.params['blogId'], req.params['id']);
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        successResponse(res, comment);
    }
}
