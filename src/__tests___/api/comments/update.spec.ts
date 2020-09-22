import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {adminUser, managerUser} from "../../../users";
import {CommentUpdater} from "../../../models";
import * as faker from "faker";
import {getApiUrl} from "../../../utils/api";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('comment update', () => {
    initDb('commentsUpdate');
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
        expect(response.status).toBe(HttpCodes.Ok);
        expect(response.body.author).toEqual(adminUser.login);
    });

    it('should not update other user comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: comment.id});
        const commentUpdater: CommentUpdater = {
            message: faker.lorem.text(),
        }
        const response = await request
            .put(url)
            .set(getAuth(managerUser))
            .send(commentUpdater);
        expect(response.status).toBe(HttpCodes.Forbidden);
    });

    it('should not update comment without authorization', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: comment.id});
        const commentUpdater: CommentUpdater = {
            message: faker.lorem.text(),
        }
        const response = await request
            .put(url)
            .send(commentUpdater);
        expect(response.status).toBe(HttpCodes.Unauthorized);
    });

    it('should not update not existent comment', async () => {
        const [blog] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: blog.id, id: Types.ObjectId().toHexString()});
        const commentUpdater: CommentUpdater = {
            message: faker.lorem.text(),
        }
        const response = await request
            .put(url)
            .set(getAuth())
            .send(commentUpdater);
        expect(response.status).toBe(HttpCodes.NotFound);
    });

    it('should not update not existent blog comment', async () => {
        const [, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.updateComment, {blogId: Types.ObjectId().toHexString(), id: comment.id});
        const commentUpdater: CommentUpdater = {
            message: faker.lorem.text(),
        }
        const response = await request
            .put(url)
            .set(getAuth())
            .send(commentUpdater);
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
