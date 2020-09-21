import {Blog, BlogCreator, CommentCreator, ormBlog, ormComment, Comment} from "../../../models";
import faker from "faker";
import {adminUser} from "../../../users";

export const createBlogAndComment = async (): Promise<[ormBlog, ormComment]> => {
    const commentCreator: CommentCreator = {
        message: faker.lorem.text(50),
    };
    const comment = new Comment(commentCreator);
    comment.author = adminUser.login;
    await comment.save();
    const blogCreator: BlogCreator = {
        content: faker.lorem.text(200),
        title: faker.lorem.words(4)
    };
    const blog = new Blog(blogCreator);
    blog.author = adminUser.login;
    blog.commentIds = [comment._id];
    await blog.save();
    return [blog, comment];
}
