import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {Blog, BlogUpdater, ormBlog} from "../../../models";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
import {adminUser, managerUser} from "../../../users";
import {Types} from "mongoose";

describe('blog update', () => {

    it('should update existent blog', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const blogUpdater: BlogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .set(getAuth())
            .send(blogUpdater);
        expect(response.status).toBe(201);
        const updatedBlog: ormBlog = response.body;
        expect(updatedBlog.title).toEqual(blogUpdater.title);
        expect(updatedBlog._id).toEqual(blog._id.toString());
        expect(updatedBlog.content).toEqual(blogUpdater.content);
    }, 10000);

    it('should not update other user existent blog', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const blogUpdater: BlogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .set(getAuth(managerUser))
            .send(blogUpdater);
        expect(response.status).toBe(403);
    });

    it('should not update blog without authorization', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const blogUpdater: BlogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .send(blogUpdater);
        expect(response.status).toBe(401);
    });

    it('should not update not existent blog', async () => {
        const blogUpdater: BlogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const randomObjectId = Types.ObjectId();
        const response = await request
            .put(Routes.updateBlog.replace(':id', randomObjectId.toHexString()))
            .set(getAuth(adminUser))
            .send(blogUpdater);
        expect(response.status).toBe(404);
    });
});
