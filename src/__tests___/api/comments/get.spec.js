import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {createBlogAndComment} from "../helpers/comment";
import {Types} from "mongoose";
import {getApiUrl} from "../../../utils/api";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('comment get', () => {
    initDb('commentsGet');
    it('should get blog single comment', async () => {
        const [blog, createdComment] = await createBlogAndComment();
        const response = await request.get(getApiUrl(Routes.getComment, {
            blogId: blog.id,
            id: createdComment.id
        })).send();
        expect(response.status).toBe(HttpCodes.Ok);
        const comment = response.body;
        expect(comment).not.toBeUndefined();
        expect(comment.message).toEqual(createdComment.message);
        expect(comment._id).toEqual(createdComment.id);
    });
    it('not existent comment should return 404', async () => {
        const response = await request.get(getApiUrl(Routes.getComment, {
            id: Types.ObjectId().toHexString(),
            blogId: Types.ObjectId().toHexString()
        })).send();
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
