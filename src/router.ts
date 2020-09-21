import {authMiddleware} from "./utils/middlewares/auth";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';
import {BlogController} from "./controllers/blogController";
import {Routes} from "./routes";
import {Express} from "express";
import {blogCommentMiddleware, blogEditMiddleware} from "./utils/middlewares/blogEdit";
import {CommentController} from "./controllers/commentController";
import {commentEditMiddleware} from "./utils/middlewares/commentEdit";

const blogController = new BlogController();
const commentController = new CommentController();
export const appRouter = (app: Express) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res) => res.send('Blog Rest API Service'));

    /* comment */
    app.post(Routes.crateComment, [authMiddleware, blogCommentMiddleware], commentController.create);
    app.delete(Routes.deleteComment, [authMiddleware, blogCommentMiddleware, commentEditMiddleware], commentController.delete);
    app.put(Routes.updateComment, [authMiddleware, blogCommentMiddleware, commentEditMiddleware], commentController.update);
    app.get(Routes.getCommentsByBlog, [blogCommentMiddleware], commentController.list);
    /* blog */
    app.post(Routes.createBlog, [authMiddleware], blogController.create);
    app.put(Routes.updateBlog, [authMiddleware, blogEditMiddleware], blogController.update);
    app.delete(Routes.deleteBlog, [authMiddleware, blogEditMiddleware], blogController.delete);
    app.get(Routes.getBlogList, blogController.list);
};
