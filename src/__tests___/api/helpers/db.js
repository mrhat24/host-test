import mongoose from "mongoose";
import {environment} from "../../../env";

export const initDb = (dbName) => {
    mongoose.connect(environment.mongoUrl(dbName), {useUnifiedTopology: true});
    const db = mongoose.connection;
    beforeAll((done) => {
        db.once('open', function() {
            done();
        });
    });

    afterAll(async (done) => {
        await db.close();
        done();
    });
};
