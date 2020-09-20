import {db} from "../../db";

describe('db', () => {
    afterAll(() => {
        db.close();
    })
    it('test connection', () => {
        expect(db.readyState).toEqual(1);
    });
});
