import {Request, Response} from "express";
import {CommentCreator, CommentUpdater} from "../models";
import {validate} from "../utils/validation";
import check from "check-types";
import {getLogin} from "../utils/middlewares/auth";
import {CommentService} from "../services/commentService";
import {getBlog} from "../utils/middlewares/blog";
import {getComment} from "../utils/middlewares/comment";

const commentService = new CommentService();

export class CommentController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const commentCreator: CommentCreator = req.body;
            const blog = getBlog(req.body);
            validate<CommentCreator>(commentCreator, [
                {
                    field: 'message',
                    validator: (item) => check.string(item.message) && check.nonEmptyString(item.message),
                    error: 'Поле message не заполнено',
                },
            ]);
            const comment = await commentService.create(commentCreator, getLogin(req.body), blog.id);
            blog.commentIds.push(comment._id);
            await blog.save();
            res.status(201).send(comment);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id = req.params['id'];
        const blogId = req.params['blogId'];
        try {
            await commentService.delete(blogId, id);
            res.status(200).send();
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const commentUpdater: CommentUpdater = req.body;
            const blog = getBlog(req.body);
            const srcComment = getComment(req.body);
            validate<CommentUpdater>(commentUpdater, [
                {
                    field: 'message',
                    validator: (item) => check.string(item.message) && check.nonEmptyString(item.message),
                    error: 'Поле message не заполнено',
                },
            ]);
            const comment = await commentService.update(commentUpdater, blog.id, srcComment.id);
            res.status(201).send(comment);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const blog = getBlog(req.body);
            const list = await commentService.list(blog.commentIds, blog.id);
            res.status(200).send(list);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }
}
