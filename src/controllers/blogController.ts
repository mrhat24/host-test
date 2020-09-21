import {Request, Response} from 'express';
import {BlogService} from "../services/blogService";
import {BlogCreator, BlogUpdater} from "../models";
import {validate} from "../utils/validation";
import check from "check-types";
import {getLogin} from "../utils/middlewares/auth";

const blogService = new BlogService();

export class BlogController {

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const blogCreator: BlogCreator = req.body;
            validate<BlogCreator>(blogCreator, [
                {
                   field: 'title',
                   validator: (item) => check.string(item.title) && check.nonEmptyString(item.title),
                   error: 'Поле title не заполнено',
               },
               {
                   field: 'content',
                   validator: (item) => check.string(item.content) && check.nonEmptyString(item.content),
                   error: 'Поле content не заполнено',
               },
            ]);
            const blog = await blogService.create(blogCreator, getLogin(req.body));
            res.status(201).send(blog);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id = req.params['id'];
        try {
            const blogUpdater: BlogUpdater = req.body;
            validate<BlogUpdater>(blogUpdater, [
                {
                    field: 'title',
                    validator: (item) => item.title !== undefined ? check.string(item.title) && check.nonEmptyString(item.title) : true,
                    error: 'Поле title не заполнено',
                },
                {
                    field: 'content',
                    validator: (item) => item.content !== undefined ? check.string(item.content) && check.nonEmptyString(item.content) : true,
                    error: 'Поле content не заполнено',
                },
            ]);

            const blog = await blogService.update(blogUpdater, id);
            res.status(201).send(blog);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id = req.params['id'];
        try {
            await blogService.delete(id);
            res.status(200).send();
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const list = await blogService.list();
            res.status(200).send(list);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

}
