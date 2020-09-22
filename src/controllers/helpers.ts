import {Response} from "express";
import {Blog, Comment, ormBlog, ormComment} from "../models";
import {HandledError} from "../utils/handledError";
import {HttpCodes} from "../utils/api";

export interface SuccessResponseOptions {
    headers?: { [key: string]: string };
    successCode?: HttpCodes;
}

export const successResponse = (res: Response, payload?: any, options?: SuccessResponseOptions) => {

    const successCode = options?.successCode | HttpCodes.Ok;

    const headers = options?.headers || {};

    for (const key of Object.keys(headers)) {
        res.setHeader(key, headers[key]);
    }

    if (payload) {
        res.status(successCode).send(payload);
    } else {
        res.sendStatus(successCode);
    }
}

export const isBlogEditable = (blog: ormBlog, userLogin: string): void => {
    if (blog.author !== userLogin) {
        throw new HandledError(403, 'Нельзя редактировать чужой блог.')
    }
}

export const isCommentEditable = (comment: ormComment, userLogin: string): void => {
    if (comment.author !== userLogin) {
        throw new HandledError(403, 'Нельзя редактировать чужой комментарий.')
    }
}

export const getComment = async (id: string): Promise<ormComment> => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new HandledError(HttpCodes.NotFound);
    }
    return comment;
}

export const getBlog = async (id: string): Promise<ormBlog> => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new HandledError(HttpCodes.NotFound);
    }
    return blog;
}
