import {authMiddleware} from "./lib/auth";

export const appRouter = (app) => {
    app.use(authMiddleware);
    app.get('/', (req, res) => res.send('Express + TypeScript Server'));
};
