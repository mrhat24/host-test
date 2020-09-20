import {Blog, BlogCreator, BlogUpdater, IBlog} from "../models";
import {Path, PathParam, POST, PUT, Security} from "typescript-rest";

@Path('')
export class BlogService {
    @POST
    @Path('/blog')
    @Security('basicAuth')
    public async create(blog: BlogCreator): Promise<IBlog> {
        const createdBlog = new Blog(blog);
        await createdBlog.save();
        return createdBlog;
    }

    @PUT
    @Path('/blog/:id')
    @Security('basicAuth')
    public async update(blog: BlogUpdater, @PathParam('id') id: string): Promise<IBlog> {
        const createdBlog = new Blog(blog);
        await createdBlog.save();
        return createdBlog;
    }
}
