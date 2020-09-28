import {Schema, model} from "mongoose";

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
});

export const Blog = model('Blog', blogSchema);
