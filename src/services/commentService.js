import {Blog, Comment} from "../models/index";
import {validateModel} from "../utils/validation";
import check from "check-types";
import {HandledError} from "../utils/handledError";
import {isCommentEditable} from "../controllers/helpers";
import {HttpCodes} from "../utils/http";


export class CommentService {
    async create(commentCreator, author, blogId) {
        validateModel(commentCreator, [
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

    async delete(blogId, _id, login) {
        const comment = await Comment.findOne({_id, blogId});
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        isCommentEditable(comment, login);
        await Comment.deleteOne({_id});
    }

    async update(commentUpdater, login, blogId, _id) {
        validateModel(commentUpdater, [
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

    async list(blogId) {
        const isBlogExist = await Blog.exists({_id: blogId});
        if (!isBlogExist) {
            throw new HandledError(HttpCodes.NotFound);
        }
        const comments = await Comment.find({blogId});
        return comments;
    }

    async get(blogId, id) {
        const comment = await Comment.findById({_id: id, blogId});
        if (!comment) {
            throw new HandledError(HttpCodes.NotFound);
        }
        return comment;
    }
}
