import {Blog} from "../models/index";
import {validateModel} from "../utils/validation";
import check from "check-types";
import {isBlogEditable} from "../controllers/helpers";
import {HandledError} from "../utils/handledError";
import {HttpCodes} from "../utils/http";


export class BlogService {

    async create(blogCreator, author) {
        validateModel(blogCreator, [
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
        const createdBlog = new Blog({...blogCreator, author});
        await createdBlog.save();
        return createdBlog;
    }

    async update(blogUpdater, login, id) {
        validateModel(blogUpdater, [
            {
                field: 'title',
                validator: (item) => item.title === undefined
                    ? true
                    : check.string(item.title) && check.nonEmptyString(item.title),
                error: 'Поле title не заполнено',
            },
            {
                field: 'content',
                validator: (item) => item.content === undefined
                    ? true
                    : check.string(item.content) && check.nonEmptyString(item.content),
                error: 'Поле content не заполнено',
            },
        ]);
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isBlogEditable(blog, login);
        await Blog.updateOne({_id: id}, blogUpdater);
        const updatedBlog = Blog.findById(id);
        return updatedBlog;
    }

    async delete(id, login) {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isBlogEditable(blog, login);
        await Blog.deleteOne({_id: id});
    }

    async list() {
        const list = await Blog.find();
        return list;
    }

    async get(id) {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        return blog;
    }
}
