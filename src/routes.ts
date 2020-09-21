export enum Routes {
    readBlog = '/blog/:id',
    createBlog = '/blog',
    updateBlog = '/blog/:id',
    deleteBlog = '/blog/:id',
    getBlogList = '/blogs',

    crateComment = '/blog/:blogId/comment',
    updateComment = '/blog/:blogId/comment/:id',
    deleteComment = '/blog/:blogId/comment/:id',
    getCommentsByBlog = '/blog/:blogId/comments',
}

export const getApiUrl = (apiUrl: string, params: {[key: string]: any} = {}): string => {
    let replacedUrl = apiUrl;
    for (const key in params) {
        replacedUrl = replacedUrl.replace(':' + key, params[key]);
    }
    return replacedUrl;
}
