export const environment = {
    mongoUrl: (dbName: string = 'test') => {
        if (process.env.NODE_ENV === 'test') {
            return `mongodb://admin:password@localhost:27017/${dbName}?authSource=admin`;
        }
        return process.env.MONGO_URL
            ? process.env.MONGO_URL
            : 'mongodb://admin:password@localhost:27017/app?authSource=admin';
    },
    port: process.env.APP_PORT ? process.env.APP_PORT : 3000,
};
