export const Routes = {
    getBlog: '/blogs/:id',
    createBlog: '/blogs',
    updateBlog: '/blogs/:id',
    deleteBlog: '/blogs/:id',
    getBlogList: '/blogs',

    getComment: '/blogs/:blogId/comments/:id',
    crateComment: '/blogs/:blogId/comments',
    updateComment: '/blogs/:blogId/comments/:id',
    deleteComment: '/blogs/:blogId/comments/:id',
    getCommentsByBlog: '/blogs/:blogId/comments',
}
