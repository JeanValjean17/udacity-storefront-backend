import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test enpoint responses', () => {
  it('get the main api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('get the resize image api endpoint', async () => {
    const response = await request.get(
      '/api/imageresize?filename=bliss&width=50&height=50',
    );
    expect(response.status).toBe(200);
  });
});
