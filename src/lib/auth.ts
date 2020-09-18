import {adminUser} from "../users";

export const authMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send('You are not authenticated!');
        return;
    }
    const authData = authHeader.replace("Basic ", "");
    const auth = Buffer.from(authData, 'base64').toString().split(':');
    const login = auth[0];
    const pass = auth[1];
    if (login == adminUser.login && pass == adminUser.password) {
        next(); // authorized
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send('You are not authenticated!');
    }
    next();
};
