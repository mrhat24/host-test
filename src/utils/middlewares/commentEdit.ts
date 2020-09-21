import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import {Comment, iComment} from "../../models";
import {getLogin} from "./auth";

const commentMiddlewareParam = '__comment';

export const commentEditMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const id = req.params['id'];

    const login = getLogin(req.body);

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).send({message: 'Не верный id.'});
        return;
    }

    const existentComment = await Comment.findById(id);

    if (!existentComment) {
        res.status(404).send({message: 'Комментарий не найден.'});
        return;
    }

    if(existentComment.author !== login) {
        res.status(403).send({message: 'Нельзя редактировать чужой комментарий.'});
        return;
    }

    req.body[commentMiddlewareParam] = existentComment;
    next();
};

export const getComment = (body: any): iComment => {
    return body[commentMiddlewareParam];
}
