import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {Blog, BlogCreator, BlogUpdater, IBlog} from "../../../models";
import faker from 'faker';
import {getAdminAuth} from "../helpers/auth";
import {adminUser} from "../../../users";
import {db} from "../../../db";

describe('blog update', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });
    it('should update existent blog', async () => {
        const blogCreator: BlogCreator = {
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        };
        const blog = new Blog(blogCreator);
        await blog.save();
        const blogUpdater: BlogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
            date: new Date(),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .set(getAdminAuth())
            .send(blogUpdater);
        expect(response.status).toBe(201);
    });
});
