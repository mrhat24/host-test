import {Blog} from "../../../models/index";
import faker from "faker";
import {adminUser} from "../../../models/users";

export const createBlog = async () => {
    const blogCreator = {
        content: faker.lorem.text(200),
        title: faker.lorem.words(4)
    };
    const blog = new Blog(blogCreator);
    blog.author = adminUser.login;
    await blog.save();
    return blog;
}
