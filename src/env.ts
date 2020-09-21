export const evninronment = {
    mongoUrl: process.env.MONGO_URL
        ? process.env.MONGO_URL
        : (process.env.NODE_ENV === 'test'
            ? 'mongodb://admin:password@localhost:27017/appTest?authSource=admin'
            : 'mongodb://admin:password@localhost:27017/app?authSource=admin'),
    port: process.env.APP_PORT ? process.env.APP_PORT : 3000,
};
