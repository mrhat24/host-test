import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {IBlog} from "../../../models";
import {db} from "../../../db";

describe('blog list', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });
    it('should get blog list', async () => {
        const response = await request.get(Routes.getBlogList).send();
        expect(response.status).toBe(200);
        const blog: IBlog[] = response.body;
        expect(Array.isArray(blog)).toEqual(true);
    });
});
