import {request} from "../helpers/supertest";
import {getApiUrl, Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {managerUser} from "../../../users";
import {CommentUpdater} from "../../../models";
import * as faker from "faker";

describe('comment update', () => {
    it('should update comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const commentUpdater: CommentUpdater = {
            message: faker.lorem.text(),
        }
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .put(url)
            .set(getAuth())
            .send(commentUpdater);
        expect(response.status).toBe(201);
    });

    it('should not update other user comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .put(url)
            .set(getAuth(managerUser))
            .send();
        expect(response.status).toBe(403);
    });

    it('should not update comment without authorization', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .put(url)
            .send();
        expect(response.status).toBe(401);
    });

    it('should not update not existent comment', async () => {
        const [blog] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: Types.ObjectId().toHexString()});
        const response = await request
            .put(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(404);
    });

    it('should not update not existent blog comment', async () => {
        const [, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: Types.ObjectId().toHexString(), id: comment.id});
        const response = await request
            .put(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(404);
    });
});
