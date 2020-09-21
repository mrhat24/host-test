import {db} from "../../../db";
import {request} from "../helpers/supertest";
import {getApiUrl, Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {managerUser} from "../../../users";

describe('comment delete', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });

    it('should delete comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(200);
    });

    it('should not delete other user comment', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth(managerUser))
            .send();
        expect(response.status).toBe(403);
    });

    it('should not delete comment without authorization', async () => {
        const [blog, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: comment.id});
        const response = await request
            .delete(url)
            .send();
        expect(response.status).toBe(401);
    });

    it('should not delete not existent comment', async () => {
        const [blog] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: blog.id, id: Types.ObjectId().toHexString()});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(404);
    });

    it('should not delete not existent blog comment', async () => {
        const [, comment] = await createBlogAndComment();
        const url = getApiUrl(Routes.deleteComment, {blogId: Types.ObjectId().toHexString(), id: comment.id});
        const response = await request
            .delete(url)
            .set(getAuth())
            .send();
        expect(response.status).toBe(404);
    });
});
