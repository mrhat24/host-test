import {ContextRequest, DELETE, GET, Path, PathParam, POST, PUT, Security} from "typescript-rest";
import {Blog, Comment, CommentCreator, CommentUpdater, IComment} from "../models";
import {validateModel} from "../utils/validation";
import check from "check-types";
import {HandledError} from "../utils/handledError";
import {isCommentEditable} from "../controllers/helpers";
import {HttpCodes} from "../utils/http";

@Path('')
export class CommentService {
    @POST
    @Path('/blogs/:blogId/comments')
    @Security('basicAuth')
    public async create(commentCreator: CommentCreator, @ContextRequest author: string, @PathParam('blogId') blogId: string): Promise<IComment> {
        validateModel<CommentCreator>(commentCreator, [
            {
                field: 'message',
                validator: (item) => check.string(item.message) && check.nonEmptyString(item.message),
                error: 'Поле message не заполнено',
            },
        ]);
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new HandledError(HttpCodes.NotFound);
        }
        const comment = new Comment({...commentCreator, author});
        comment.blogId = blogId;
        comment.date = new Date();
        await comment.save();
        return comment;
    }

    @DELETE
    @Path('/blogs/:blogId/comments/:id')
    @Security('basicAuth')
    public async delete(@PathParam('blogId') blogId: string, @PathParam('id') _id: string, @ContextRequest login: string): Promise<void> {
        const comment = await Comment.findOne({_id, blogId});
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isCommentEditable(comment, login);
        await Comment.deleteOne({_id});
    }

    @PUT
    @Path('/blogs/:blogId/comments/:id')
    @Security('basicAuth')
    public async update(commentUpdater: CommentUpdater, @ContextRequest login: string, @PathParam('blogId') blogId: string, @PathParam('id') _id: string): Promise<IComment> {
        validateModel<CommentUpdater>(commentUpdater, [
            {
                field: 'message',
                validator: (item) => check.string(item.message) && check.nonEmptyString(item.message),
                error: 'Поле message не заполнено',
            },
        ]);
        const comment = await Comment.findOne({_id, blogId});
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isCommentEditable(comment, login);
        await Comment.updateOne({_id}, commentUpdater);
        const updatedComment = await Comment.findById(_id);
        return updatedComment;
    }

    @GET
    @Path('/blogs/:blogId/comments')
    @Security('basicAuth')
    public async list(@PathParam('blogId') blogId: string): Promise<IComment[]> {
        const isBlogExist = await Blog.exists({_id: blogId});
        if (!isBlogExist) {
            throw new HandledError(HttpCodes.NotFound);
        }
        const comments = await Comment.find({blogId});
        return comments;
    }

    @GET
    @Path('/blogs/:blogId/comments/:id')
    @Security('basicAuth')
    public async get(@PathParam('blogId') blogId: string, @PathParam('id') id: string): Promise<IComment> {
        const comment = await Comment.findById({_id: id, blogId});
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        return comment;
    }
}
