import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {BlogCreator, IBlog} from "../../../models";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
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
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        };
        const response = await request.post(Routes.createBlog).set(getAuth()).send(blogCreator);
        expect(response.status).toBe(201);
        const blog: IBlog = response.body;
        expect(blog.title).toEqual(blogCreator.title);
        expect(blog.content).toEqual(blogCreator.content);
        expect(blog.author).toEqual(adminUser.login);
        expect(blog.date).toBeDefined();
    });
    it('should not create new blog with invalid title', async () => {
        const blogCreator: BlogCreator = {
            content: faker.lorem.text(200),
            title: null,
        };
        const response = await request.post(Routes.createBlog).set(getAuth()).send(blogCreator);
        expect(response.status).toBe(400);
    });
    it('should not create new blog without authorization', async () => {
        const blogCreator: BlogCreator = {
            content: faker.lorem.text(200),
            title: null,
        };
        const response = await request.post(Routes.createBlog).send(blogCreator);
        expect(response.status).toBe(401);
    });
});
