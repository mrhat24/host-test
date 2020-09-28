import {HttpCodes} from "../http";

export const errorHandlerMiddleware = function (err, req, res, next) {
    if (!err.statusCode) {
        err.statusCode = HttpCodes.InternalError;
    }

    if (![HttpCodes.Ok, HttpCodes.Created].includes(err.statusCode)) {
        res.status(err.statusCode).send({ errorDetails: err.message });
    }

    next(err);
};
