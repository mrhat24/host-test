import {db} from "../../db";

describe('db', () => {
    beforeAll((done) => {
        db.once('open', function() {
           done();
        });
    });
    afterAll(() => {
        db.close();
    })
    it('test connection', () => {
        expect(db.readyState).toEqual(1);
    });
});
