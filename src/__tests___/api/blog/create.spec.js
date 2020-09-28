import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
import {adminUser} from "../../../models/users";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('blog create', () => {
    initDb('blogCreate');
    it('should create new blog', async () => {
        const blogCreator = {
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        };
        const response = await request.post(Routes.createBlog).set(getAuth()).send(blogCreator);
        expect(response.status).toBe(HttpCodes.Created);
        const blog = response.body;
        expect(blog.title).toEqual(blogCreator.title);
        expect(blog.content).toEqual(blogCreator.content);
        expect(blog.author).toEqual(adminUser.login);
        expect(blog.date).toBeDefined();

        expect(response.headers['location']).not.toBeUndefined();
        expect(response.headers['location'].includes(blog._id)).toEqual(true);
    });
    it('should not create new blog with invalid title', async () => {
        const blogCreator = {
            content: faker.lorem.text(200),
            title: null,
        };
        const response = await request.post(Routes.createBlog).set(getAuth()).send(blogCreator);
        expect(response.status).toBe(HttpCodes.BadRequest);
    });
    it('should not create new blog without authorization', async () => {
        const blogCreator = {
            content: faker.lorem.text(200),
            title: null,
        };
        const response = await request.post(Routes.createBlog).send(blogCreator);
        expect(response.status).toBe(HttpCodes.Unauthorized);
    });
});
