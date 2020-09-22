import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {IComment} from "../../../models";
import {getApiUrl} from "../../../utils/api";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('comment update', () => {
    initDb('commentsList');
    it('should get blog comments list', async () => {
        const [blog, comment] = await createBlogAndComment();
        const response = await request.get(getApiUrl(Routes.getCommentsByBlog, { blogId: blog.id })).send();
        expect(response.status).toBe(HttpCodes.Ok);
        const comments: IComment[] = response.body;
        expect(Array.isArray(comments)).toEqual(true);
        const newComment = comments.find(item => item._id.toString() === comment._id.toString());
        expect(newComment).not.toBeUndefined();
        expect(newComment.message).toEqual(comment.message);
    });

    it('should not get blog comments list for not existent blog', async () => {
        const response = await request.get(getApiUrl(Routes.getCommentsByBlog, { blogId: Types.ObjectId().toHexString() })).send();
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
