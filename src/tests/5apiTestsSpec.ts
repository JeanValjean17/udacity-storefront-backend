import app from '../index';
import supertest from 'supertest';
import { User } from '../models/users';

const request = supertest(app);
let token: string = '';

describe('Test enpoint responses', () => {
  it('get the main api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('Creates new User and gets token', async () => {
    const payload: User = {
      id: 1,
      firstname: 'Leroy',
      lastname: 'Jenkins',
      password: 'TestPassword',
    };
    const response = await request
      .post('/api/users/create')
      .send(payload);
    token = response.body.token;
    console.log(token);
    expect(response.status).toBe(200);
  });
});
