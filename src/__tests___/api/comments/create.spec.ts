import {Blog, CommentCreator, ormComment} from "../../../models";
import faker from "faker";
import {request} from "../helpers/supertest";
import {getApiUrl, Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlog} from "../helpers/blog";
import {Types} from "mongoose";

describe('comment create', () => {
    it('should create new comment', async () => {
        const blog = await createBlog()
        const commentCreator: CommentCreator = {
            message: faker.lorem.text(),
        };
        const url = getApiUrl(Routes.crateComment, {blogId: blog.id});
        const response = await request
            .post(url)
            .set(getAuth())
            .send(commentCreator);

        expect(response.status).toBe(201);
        const comment: ormComment = response.body;
        expect(comment.message).toEqual(commentCreator.message);

        const changedBlog = await Blog.findById({_id: blog.id});

        expect(changedBlog.commentIds.includes(comment._id)).toBe(true);
    });

    it('should not create new comment for not existent blog', async () => {
        const commentCreator: CommentCreator = {
            message: faker.lorem.text(),
        };
        const url = getApiUrl(Routes.crateComment, {blogId: Types.ObjectId().toHexString()});
        const response = await request
            .post(url)
            .set(getAuth())
            .send(commentCreator);

        expect(response.status).toBe(404);
    });

    it('should not create new comment without authorization', async () => {
        const commentCreator: CommentCreator = {
            message: faker.lorem.text(),
        };
        const url = getApiUrl(Routes.crateComment, {blogId: Types.ObjectId().toHexString()});
        const response = await request
            .post(url)
            .send(commentCreator);

        expect(response.status).toBe(401);
    });
});
