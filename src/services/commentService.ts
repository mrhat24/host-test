import {ContextRequest, DELETE, GET, Path, PathParam, POST, PUT, Security} from "typescript-rest";
import {Blog, Comment, CommentCreator, CommentUpdater, IComment} from "../models";

@Path('')
export class CommentService {
    @POST
    @Path('/blog/:blogId/comment')
    @Security('basicAuth')
    public async create(commentCreator: CommentCreator, @ContextRequest author: string, @PathParam('blogId') blogId: string): Promise<IComment> {
        const comment = new Comment(commentCreator);
        comment.date = new Date();
        await comment.save();
        return comment;
    }

    @DELETE
    @Path('/blog/:blogId/comment/:id')
    @Security('basicAuth')
    public async delete(@PathParam('blogId') blogId: string, @PathParam('id') id: string): Promise<void> {
        await Comment.deleteOne({_id: id});
    }

    @PUT
    @Path('/blog/:blogId/comment/:id')
    @Security('basicAuth')
    public async update(commentUpdater: CommentUpdater, @PathParam('blogId') blogId: string, @PathParam('id') id: string): Promise<IComment> {
        await Comment.updateOne({_id: id}, commentUpdater);
        const comment = await Comment.findById(id);
        return comment;
    }

    @GET
    @Path('/blog/:blogId/comment')
    @Security('basicAuth')
    public async list(commentIds: string[], @PathParam('blogId') blogId: string): Promise<IComment[]> {
        const comments = await Comment.find({_id: {$in: commentIds}});
        return comments;
    }
}
