import {Blog, BlogCreator, ormBlog} from "../../../models";
import faker from "faker";
import {adminUser} from "../../../users";

export const createBlog = async (): Promise<ormBlog> => {
    const blogCreator: BlogCreator = {
        content: faker.lorem.text(200),
        title: faker.lorem.words(4)
    };
    const blog = new Blog(blogCreator);
    blog.author = adminUser.login;
    await blog.save();
    return blog;
}
