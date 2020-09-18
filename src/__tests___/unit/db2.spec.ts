import {db} from "../../db";
import {Blog} from "../../models";

describe('db', () => {
    beforeAll((done) => {
        db.once('open', function() {
           done();
        });
    });
    afterAll(() => {
        db.dropDatabase();
        db.close();
    })
    it('test connection', async () => {
        const blog = new Blog();
        blog.title = 'testTitle';
        blog.author = 'foo';
        await blog.save();
        const newBlog = await Blog.findOne({ author: 'foo' });
        expect(newBlog).not.toBeNull();
        expect(newBlog?.author).toEqual('foo');
    });
});
