import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {managerUser} from "../../../users";
import {getApiUrl, HttpCodes} from "../../../utils/api";
import {initDb} from "../helpers/db";

describe('comment delete', () => {
    initDb('commentsDelete');
    it('should delete comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(HttpCodes.Ok);
    });

    it('should not delete other user comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth(managerUser))
            .send();
        expect(response.status).toBe(HttpCodes.Forbidden);
    });

    it('should not delete comment without authorization', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .send();
        expect(response.status).toBe(HttpCodes.Unauthorized);
    });

    it('should not delete not existent comment', async () => {
        const [blog] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: Types.ObjectId().toHexString()});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(HttpCodes.NotFound);
    });

    it('should not delete not existent blog comment', async () => {
        const [, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: Types.ObjectId().toHexString(), id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
