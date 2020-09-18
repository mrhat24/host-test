import {request} from "./supertest";

it('gets the test endpoint', async done => {
    const auth = Buffer.from('admin:password').toString('base64');
    const response = await request.get('/').set('authorization', "Basic " + auth);

    expect(response.status).toBe(200);
    done();
});
