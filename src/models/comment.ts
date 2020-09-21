import {Document, model, Schema} from "mongoose";

const commentSchema = new Schema({
    author: String,
    message: String,
    date: { type: Date, default: Date.now },
});

export interface CommentCreator {
    message: string;
}

export interface IComment {
    _id?: string;
    author: string;
    message: string;
    date: Date;
}


export interface CommentUpdater {
    message?: string;
}

export type iComment = IComment & Document;

export const Comment = model<iComment>('Comment', commentSchema);
