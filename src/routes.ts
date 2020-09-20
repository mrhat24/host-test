export enum Routes {
    readBlog = '/blog/:id',
    createBlog = '/blog',
    updateBlog = '/blog/:id',
    deleteBlog = '/blog/:id',
    getBlogList = '/blogs',

    crateComment = '/comment',
    updateComment = '/comment/:id',
    deleteComment = '/comment/:id',
    getCommentsByBlog = '/comments/:blogId',
}
