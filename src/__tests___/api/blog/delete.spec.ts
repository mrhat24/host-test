import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {Blog, BlogUpdater, iBlog} from "../../../models";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
import {adminUser, managerUser} from "../../../users";
import {db} from "../../../db";
import {Types} from "mongoose";

describe('blog delete', () => {
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });
    afterAll(() => {
        db.close();
    });

    it('should delete existent blog', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const response = await request
            .delete(Routes.deleteBlog.replace(':id', blog.id))
            .set(getAuth())
            .send();
        expect(response.status).toBe(200);
        const exists = await Blog.exists({_id: blog.id});
        expect(exists).toEqual(false);
    });

    it('should not delete not existent blog', async () => {
        const randomObjectId = Types.ObjectId();
        const response = await request
            .delete(Routes.deleteBlog.replace(':id', randomObjectId.toHexString()))
            .set(getAuth())
            .send();
        expect(response.status).toBe(404);
    });

    it('should not delete blog without authorization', async () => {
        const blog = new Blog({
            author: adminUser.login,
            content: faker.lorem.text(200),
            title: faker.lorem.words(4)
        });
        await blog.save();
        const response = await request
            .delete(Routes.deleteBlog.replace(':id', blog.id))
            .send();
        expect(response.status).toBe(401);
    });
});
