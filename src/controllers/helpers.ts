import {Response} from "express";
import {ormBlog, ormComment} from "../models";
import {HandledError} from "../utils/handledError";
import {HttpCodes} from "../utils/http";

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
