import {Blog, BlogCreator, BlogUpdater, IBlog} from "../models";
import {ContextRequest, DELETE, GET, Path, PathParam, POST, PUT, Security} from "typescript-rest";
import {validateModel} from "../utils/validation";
import check from "check-types";
import {isBlogEditable} from "../controllers/helpers";
import {HandledError} from "../utils/handledError";
import {HttpCodes} from "../utils/api";


@Path('')
export class BlogService {

    @POST
    @Path('/blogs')
    @Security('basicAuth')
    public async create(blogCreator: BlogCreator, @ContextRequest author: string): Promise<IBlog> {
        validateModel<BlogCreator>(blogCreator, [
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

    @PUT
    @Path('/blogs/:id')
    @Security('basicAuth')
    public async update(blogUpdater: BlogUpdater, @ContextRequest login: string, @PathParam('id') id: string): Promise<IBlog> {
        validateModel<BlogUpdater>(blogUpdater, [
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

    @DELETE
    @Path('/blogs/:id')
    @Security('basicAuth')
    public async delete(@PathParam('id') id: string, @ContextRequest login: string): Promise<void> {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isBlogEditable(blog, login);
        await Blog.deleteOne({_id: id});
    }

    @GET
    @Path('/blogs')
    public async list(): Promise<IBlog[]> {
        const list = await Blog.find();
        return list;
    }

    @GET
    @Path('/blogs/:id')
    public async get(@PathParam('id') id: string): Promise<IBlog> {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        return blog;
    }
}
