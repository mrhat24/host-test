import {Schema, model, Document} from "mongoose";

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    commentIds: [Number],
});

export interface IBlog extends Document {
    title: string;
    author: string;
    content: string;
    date: Date;
    commentIds: number[];
}

export const Blog = model<IBlog>('Blog', blogSchema);
