import {Request, Response} from 'express';
import {BlogService} from "../services/blogService";
import {BlogCreator} from "../models";
import {validate} from "../lib/validation";
import check from "check-types";

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
                   field: 'author',
                   validator: (item) => check.string(item.author) && check.nonEmptyString(item.author),
                   error: 'Поле author не заполнено',
               },
               {
                   field: 'content',
                   validator: (item) => check.string(item.content) && check.nonEmptyString(item.content),
                   error: 'Поле content не заполнено',
               },
           ]);
           const blog = await blogService.create(blogCreator);
           res.status(201).send(blog);
       } catch (e) {
           res.status(400).send({message: e.message});
       }
    }
}
