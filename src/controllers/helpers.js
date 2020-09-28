import {HandledError} from "../utils/handledError";
import {HttpCodes} from "../utils/http";

export const successResponse = (res, payload = null, options = {}) => {

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

export const isBlogEditable = (blog, userLogin) => {
    if (blog.author !== userLogin) {
        throw new HandledError(403, 'Нельзя редактировать чужой блог.')
    }
}

export const isCommentEditable = (comment, userLogin) => {
    if (comment.author !== userLogin) {
        throw new HandledError(403, 'Нельзя редактировать чужой комментарий.')
    }
}
