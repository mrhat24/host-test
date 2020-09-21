import {Blog, BlogCreator, BlogUpdater, IBlog} from "../models";
import {ContextRequest, DELETE, GET, Path, PathParam, POST, PUT, Security} from "typescript-rest";

@Path('')
export class BlogService {
    @POST
    @Path('/blog')
    @Security('basicAuth')
    public async create(blog: BlogCreator, @ContextRequest author: string): Promise<IBlog> {
        const createdBlog = new Blog({...blog, author});
        await createdBlog.save();
        return createdBlog;
    }

    @PUT
    @Path('/blog/:id')
    @Security('basicAuth')
    public async update(blog: BlogUpdater, @PathParam('id') id: string): Promise<IBlog> {
        await Blog.updateOne({_id: id}, blog);
        const b = await Blog.findById(id);
        return b;
    }

    @DELETE
    @Path('/blog/:id')
    @Security('basicAuth')
    public async delete(@PathParam('id') id: string): Promise<void> {
        await Blog.deleteOne({_id: id});
    }

    @GET
    @Path('/blogs')
    public async list(): Promise<IBlog[]> {
        const list = await Blog.find();
        return list;
    }
}
