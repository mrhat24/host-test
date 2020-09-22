import {CommentCreator, ormComment} from "../../../models";
import faker from "faker";
import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlog} from "../helpers/blog";
import {Types} from "mongoose";
import {getApiUrl} from "../../../utils/api";
import {initDb} from "../helpers/db";
import {adminUser} from "../../../users";
import {HttpCodes} from "../../../utils/http";

describe('comment create', () => {
    initDb('commentsCreate');
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

        expect(response.status).toBe(HttpCodes.Created);
        const comment: ormComment = response.body;
        expect(comment.message).toEqual(commentCreator.message);

        expect(comment.blogId).toEqual(blog.id);
        expect(comment.author).toEqual(adminUser.login);

        expect(response.headers['location']).not.toBeUndefined();
        expect(response.headers['location'].includes(blog._id)).toEqual(true);
        expect(response.headers['location'].includes(comment._id)).toEqual(true);
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

        expect(response.status).toBe(HttpCodes.NotFound);
    });

    it('should not create new comment without authorization', async () => {
        const commentCreator: CommentCreator = {
            message: faker.lorem.text(),
        };
        const url = getApiUrl(Routes.crateComment, {blogId: Types.ObjectId().toHexString()});
        const response = await request
            .post(url)
            .send(commentCreator);

        expect(response.status).toBe(HttpCodes.Unauthorized);
    });
});
