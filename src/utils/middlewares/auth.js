import {users} from "../../models/users";
import {HttpCodes} from "../http";

const loginParamName = '__login';

export const authMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(HttpCodes.Unauthorized).send('You are not authenticated!');
        return;
    }
    const authData = authHeader.replace("Basic ", "");
    const auth = Buffer.from(authData, 'base64').toString().split(':');
    const login = auth[0];
    const pass = auth[1];
    const user = users.find(u => u.login === login);
    if (user && login === user.login && pass === user.password) {
        req.body[loginParamName] = login;
        next(); // authorized
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(HttpCodes.Unauthorized).send('You are not authenticated!');
    }
};

export const getLogin = (body) => {
    return body[loginParamName];
}
