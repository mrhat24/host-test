import {Schema, model, Document} from "mongoose";

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    commentIds: [Number],
});

export interface BlogCreator {
    title: string;
    author: string;
    content: string;
}

export interface IBlog extends BlogCreator {
    title: string;
    author: string;
    content: string;
    date: Date;
    commentIds: number[];
}

export interface BlogUpdater {
    title?: string;
    author?: string;
    content?: string;
    date?: Date;
    commentIds?: number[];
}

export const Blog = model<IBlog & Document>('Blog', blogSchema);
