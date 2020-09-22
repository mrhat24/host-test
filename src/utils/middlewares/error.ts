import {NextFunction, Request, Response} from "express";
import {HttpCodes} from "../http";

export const errorHandlerMiddleware = function (err: any, req: Request, res: Response, next: NextFunction) {
    if (!err.statusCode) {
        err.statusCode = HttpCodes.InternalError;
    }

    if (![HttpCodes.Ok, HttpCodes.Created].includes(err.statusCode)) {
        res.status(err.statusCode).send({ errorDetails: err.message });
    }

    next(err);
};
