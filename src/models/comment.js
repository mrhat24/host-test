import {model, Schema} from "mongoose";

const commentSchema = new Schema({
    author: String,
    message: String,
    date: { type: Date, default: Date.now },
    blogId: String,
});

export const Comment = model('Comment', commentSchema);
