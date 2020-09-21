import {db} from "../../../db";

beforeAll((done) => {
    db.once('open', function() {
        done();
    });
});
afterAll(() => {
    db.close();
});
