import {Schema, model, Document} from "mongoose";

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    commentIds: [String],
});

export interface BlogCreator {
    title: string;
    content: string;
}

export interface IBlog extends BlogCreator {
    _id?: string;
    author: string;
    date: Date;
    commentIds: string[];
}

export interface BlogUpdater {
    title?: string;
    content?: string;
}

export type ormBlog = IBlog & Document;

export const Blog = model<ormBlog>('Blog', blogSchema);
