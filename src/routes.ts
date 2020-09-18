import {authMiddleware} from "./lib/auth";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';
import {BlogService} from "./services/blogService";

const blogService = new BlogService();
export const appRouter = (app) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/', [authMiddleware], (req, res) => res.send('Express + TypeScript Server'));
    app.get('blog', blogService.get);
};
