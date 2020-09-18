export enum Routes {
    ReadBlog = '/blog/:id',
    CreateBlog = '/blog',
    UpdateBlog = '/blog/:id',
    DeleteBlog = '/blog/:id',
    GetBlogList = '/blogs',

    CrateComment = '/comment',
    UpdateComment = '/comment/:id',
    DeleteComment = '/comment/:id',
    GetCommentsByBlog = '/comments/:blogId',
}
