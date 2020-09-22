import {request} from "../helpers/supertest";
import {Routes} from "../../../routes";
import {Blog} from "../../../models";
import faker from 'faker';
import {getAuth} from "../helpers/auth";
import {adminUser} from "../../../users";
import {Types} from "mongoose";
import {initDb} from "../helpers/db";
import {HttpCodes} from "../../../utils/http";

describe('blog delete', () => {
    initDb('blogDelete');
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
        expect(response.status).toBe(HttpCodes.Ok);
        const exists = await Blog.exists({_id: blog.id});
        expect(exists).toEqual(false);
    });

    it('should not delete not existent blog', async () => {
        const randomObjectId = Types.ObjectId();
        const response = await request
            .delete(Routes.deleteBlog.replace(':id', randomObjectId.toHexString()))
            .set(getAuth())
            .send();
        expect(response.status).toBe(HttpCodes.NotFound);
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
        expect(response.status).toBe(HttpCodes.Unauthorized);
    });
});
