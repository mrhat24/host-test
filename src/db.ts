import mongoose, {Connection} from 'mongoose';
import {evninronment} from "./env";

export const initDb = (): Promise<Connection> => {
    return new Promise((resolve, reject) => {
        mongoose.connect(evninronment.mongoUrl, {useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', function (err) {
            console.log('db connection error', err);
        });
        db.once('open', function () {
            resolve(db);
        })
    });
};
