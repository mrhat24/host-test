import {authMiddleware} from "./utils/middlewares/auth";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';
import {BlogController} from "./controllers/blogController";
import {Routes} from "./routes";
import {CommentController} from "./controllers/commentController";
import {errorHandlerMiddleware} from "./utils/middlewares/error";

const blogController = new BlogController();
const commentController = new CommentController();
export const appRouter = (app) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res) => res.send('Blog Rest API Service'));

    /* comment */
    app.post(Routes.crateComment, [authMiddleware], commentController.create);
    app.delete(Routes.deleteComment, [authMiddleware], commentController.delete);
    app.put(Routes.updateComment, [authMiddleware], commentController.update);
    app.get(Routes.getCommentsByBlog, commentController.list);
    app.get(Routes.getComment, commentController.get);
    /* blog */
    app.post(Routes.createBlog, [authMiddleware], blogController.create);
    app.put(Routes.updateBlog, [authMiddleware], blogController.update);
    app.delete(Routes.deleteBlog, [authMiddleware], blogController.delete);
    app.get(Routes.getBlogList, blogController.list);
    app.get(Routes.getBlog, blogController.get);

    app.use(errorHandlerMiddleware);
};
