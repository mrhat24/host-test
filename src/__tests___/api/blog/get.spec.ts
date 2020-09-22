import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {IBlog} from "../../../models";
import {createBlog} from "../helpers/blog";
import {getApiUrl} from "../../../utils/api";
import {Types} from "mongoose";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('blog item', () => {
    initDb('blogGet');
    it('should get blog item', async () => {
        const createdBlog = await createBlog();
        const response = await request.get(getApiUrl(Routes.getBlog, {id: createdBlog.id})).send();
        expect(response.status).toBe(HttpCodes.Ok);
        const blog: IBlog = response.body;
        expect(blog._id).toEqual(createdBlog.id);
    });
    it('not existent blog should return 404', async () => {
        const response = await request.get(getApiUrl(Routes.getBlog, {id: Types.ObjectId().toHexString()})).send();
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
