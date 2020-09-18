export const evninronment = {
    mongoUrl: process.env.NODE_ENV === 'test'
        ? 'mongodb://admin:password@localhost:27017/appTest?authSource=admin'
        : 'mongodb://admin:password@localhost:27017/app?authSource=admin',
    port: 3000,
}
