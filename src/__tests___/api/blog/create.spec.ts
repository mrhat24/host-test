import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {BlogCreator, IBlog} from "../../../models";
import faker from 'faker';
import {getAdminAuth} from "../helpers/auth";
import {adminUser} from "../../../users";
import {db} from "../../../db";

describe('blog create', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });
    it('should create new blog', async () => {
        const blogCreator: BlogCreator = {
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        };
        const response = await request.post(Routes.createBlog).set(getAdminAuth()).send(blogCreator);
        expect(response.status).toBe(201);
        const blog: IBlog = response.body;
        expect(blog.title).toEqual(blogCreator.title);
        expect(blog.content).toEqual(blogCreator.content);
        expect(blog.author).toEqual(blogCreator.author);
        expect(blog.date).toBeDefined();
    });
    it('should not create new blog with invalid title', async () => {
        const blogCreator: BlogCreator = {
            author: faker.lorem.words(4),
            content: faker.lorem.text(200),
            title: null,
        };
        const response = await request.post(Routes.createBlog).set(getAdminAuth()).send(blogCreator);
        console.log(response);
        expect(response.status).toBe(400);
    });
});
