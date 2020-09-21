import {Types} from "mongoose";
import {Blog, ormBlog} from "../../models";
import {getLogin} from "./auth";
import {NextFunction, Request, Response} from "express";

const blogMiddlewareParam = '__blog';

export const blogEditMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const id = req.params['id'];

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).send({message: 'Не верный id.'});
        return;
    }

    const existentBlog = await Blog.findById(id);

    if (!existentBlog) {
        res.status(404).send({message: 'Блог не найден.'});
        return;
    }

    if (existentBlog.author !== getLogin(req.body)) {
        res.status(403).send({message: 'Нельзя редактировать чужой блог.'});
        return;
    }

    req.body[blogMiddlewareParam] = existentBlog;
    next();
}

export const blogCommentMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const id = req.params['blogId'];

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).send({message: 'Не верный id.'});
        return;
    }

    const existentBlog = await Blog.findById(id);

    if (!existentBlog) {
        res.status(404).send({message: 'Блог не найден.'});
        return;
    }

    req.body[blogMiddlewareParam] = existentBlog;
    next();
}

export const getBlog = (body: any): ormBlog => {
    return body[blogMiddlewareParam];
}
