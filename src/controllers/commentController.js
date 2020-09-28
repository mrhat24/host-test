import {getLogin} from "../utils/middlewares/auth";
import {CommentService} from "../services/commentService";
import {getApiUrl} from "../utils/api";
import {Routes} from "../routes";
import {HandledError} from "../utils/handledError";
import {successResponse} from "./helpers";
import {HttpCodes} from "../utils/http";

const commentService = new CommentService();

export class CommentController {
    async create(req, res) {
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

    async delete(req, res) {
        const {id, blogId} = req.params;
        await commentService.delete(blogId, id, getLogin(req.body));
        successResponse(res);
    }

    async update(req, res) {
        successResponse(res, await commentService.update(req.body, getLogin(req.body), req.params['blogId'], req.params['id']));
    }

    async list(req, res) {
        const list = await commentService.list(req.params['blogId']);
        successResponse(res, list);
    }

    async get(req, res) {
        const comment = await commentService.get(req.params['blogId'], req.params['id']);
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        successResponse(res, comment);
    }
}
