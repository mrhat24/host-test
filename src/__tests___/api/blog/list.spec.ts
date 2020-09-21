import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {IBlog} from "../../../models";

describe('blog list', () => {
    it('should get blog list', async () => {
        const response = await request.get(Routes.getBlogList).send();
        expect(response.status).toBe(200);
        const blog: IBlog[] = response.body;
        expect(Array.isArray(blog)).toEqual(true);
    });
});
