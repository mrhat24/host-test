import {Blog, BlogCreator, CommentCreator, ormBlog, ormComment, Comment} from "../../../models";
import faker from "faker";
import {adminUser} from "../../../users";

export const createBlogAndComment = async (): Promise<[ormBlog, ormComment]> => {

    const blogCreator: BlogCreator = {
        content: faker.lorem.text(200),
        title: faker.lorem.words(4)
    };
    const blog = new Blog(blogCreator);
    blog.author = adminUser.login;
    await blog.save();

    const commentCreator: CommentCreator = {
        message: faker.lorem.text(50),
    };
    const comment = new Comment(commentCreator);
    comment.blogId = blog.id;
    comment.author = adminUser.login;
    await comment.save();

    return [blog, comment];
}
