import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {Blog} from "../../../models/index";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
import {adminUser, managerUser} from "../../../models/users";
import {Types} from "mongoose";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('blog update', () => {
    initDb('blogUpdate');
    it('should update existent blog', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const blogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .set(getAuth())
            .send(blogUpdater);
        expect(response.status).toBe(HttpCodes.Ok);
        const updatedBlog = response.body;
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
        const blogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .set(getAuth(managerUser))
            .send(blogUpdater);
        expect(response.status).toBe(HttpCodes.Forbidden);
    });

    it('should not update blog without authorization', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const blogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const response = await request
            .put(Routes.updateBlog.replace(':id', blog.id))
            .send(blogUpdater);
        expect(response.status).toBe(HttpCodes.Unauthorized);
    });

    it('should not update not existent blog', async () => {
        const blogUpdater = {
            title: faker.lorem.words(4),
            content: faker.lorem.text(200),
        };
        const randomObjectId = Types.ObjectId();
        const response = await request
            .put(Routes.updateBlog.replace(':id', randomObjectId.toHexString()))
            .set(getAuth(adminUser))
            .send(blogUpdater);
        expect(response.status).toBe(HttpCodes.NotFound);
    });
});
