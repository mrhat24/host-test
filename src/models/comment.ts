import {Document, model, Schema} from "mongoose";

const commentSchema = new Schema({
    author: String,
    message: String,
    date: { type: Date, default: Date.now },
    blogId: String,
});

export interface CommentCreator {
    message: string;
}

export interface IComment {
    _id?: string;
    author: string;
    message: string;
    date: Date;
    blogId: string;
}

export interface CommentUpdater {
    message?: string;
}

export type ormComment = IComment & Document;

export const Comment = model<ormComment>('Comment', commentSchema);
