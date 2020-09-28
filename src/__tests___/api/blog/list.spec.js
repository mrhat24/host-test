import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('blog list', () => {
    initDb('blogList');
    it('should get blog list', async () => {
        const response = await request.get(Routes.getBlogList).send();
        expect(response.status).toBe(HttpCodes.Ok);
        const blog = response.body;
        expect(Array.isArray(blog)).toEqual(true);
    });
});
