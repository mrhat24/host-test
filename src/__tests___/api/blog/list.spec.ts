import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {IBlog} from "../../../models";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/api";

describe('blog list', () => {
    initDb('blogList');
    it('should get blog list', async () => {
        const response = await request.get(Routes.getBlogList).send();
        expect(response.status).toBe(HttpCodes.Ok);
        const blog: IBlog[] = response.body;
        expect(Array.isArray(blog)).toEqual(true);
    });
});
