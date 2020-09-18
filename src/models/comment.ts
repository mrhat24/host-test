import {Document, model, Schema} from "mongoose";

const commentSchema = new Schema({
    author: String,
    message: String,
    date: { type: Date, default: Date.now },
});

export interface IComment extends Document {
    author: string;
    message: string;
    date: Date;
}

export const Comment = model<IComment>('Comment', commentSchema);
