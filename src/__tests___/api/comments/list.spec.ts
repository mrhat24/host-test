import {db} from "../../../db";
import {request} from "../helpers/supertest";
import {getApiUrl, Routes} from "../../../routes";
import {getAuth} from "../helpers/auth";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {managerUser} from "../../../users";
import {CommentUpdater, IBlog, IComment} from "../../../models";
import * as faker from "faker";
import {createBlog} from "../helpers/blog";

describe('comment update', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });

    it('should get blog comments list', async () => {
        const [blog, comment] = await createBlogAndComment();
        const response = await request.get(getApiUrl(Routes.getCommentsByBlog, { blogId: blog.id })).send();
        expect(response.status).toBe(200);
        const comments: IComment[] = response.body;
        expect(Array.isArray(comments)).toEqual(true);
        const newComment = comments.find(item => item._id.toString() === comment._id.toString());
        expect(newComment).not.toBeUndefined();
        expect(newComment.message).toEqual(comment.message);
    });

    it('should not get blog comments list for not existent blog', async () => {
        const response = await request.get(getApiUrl(Routes.getCommentsByBlog, { blogId: Types.ObjectId().toHexString() })).send();
        expect(response.status).toBe(404);
    });
});
