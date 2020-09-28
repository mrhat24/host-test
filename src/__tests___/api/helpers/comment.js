import {Blog, Comment} from "../../../models/index";
import faker from "faker";
import {adminUser} from "../../../models/users";

export const createBlogAndComment = async () => {

    const blogCreator = {
        content: faker.lorem.text(200),
        title: faker.lorem.words(4)
    };
    const blog = new Blog(blogCreator);
    blog.author = adminUser.login;
    await blog.save();

    const commentCreator = {
        message: faker.lorem.text(50),
    };
    const comment = new Comment(commentCreator);
    comment.blogId = blog.id;
    comment.author = adminUser.login;
    await comment.save();

    return [blog, comment];
}
