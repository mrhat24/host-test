import {authMiddleware} from "./lib/auth";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';
import {BlogController} from "./controllers/blogController";
import {Routes} from "./routes";
import {Express} from "express";

const blogController = new BlogController();
export const appRouter = (app: Express) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/', [authMiddleware], (req, res) => res.send('Express + TypeScript Server'));
    app.post(Routes.createBlog, blogController.create);
};
