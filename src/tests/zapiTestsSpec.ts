import app from '../index';
import supertest from 'supertest';
import { User } from '../models/users';
import { Product } from '../models/product';
import { Order } from '../models/orders';

const request = supertest(app);
let token: string = '';

describe('Test enpoint responses', () => {
  it('get the main api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('Creates new User and gets token', async () => {
    const payload: User = {
      id: 2,
      firstname: 'Leroy',
      lastname: 'Jenkins',
      password: 'TestPassword',
    };
    const response = await request
      .post('/api/users/create')
      .send(payload)
      .expect(200);
    token = response.body.token;
  });

  it('Get all users', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toEqual(200);
  });

  it('Get specific user', async () => {
    const res = await request
      .get('/api/users/show/2')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toEqual(200);
  });

  it('Creates new product', async () => {
    const payload: Product = {
      id: 2,
      name: 'Product3',
      price: '123.222',
    };
    await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send(payload)
      .expect(200);
  });

  it('Get all products', async () => {
    const res = await request.get('/api/products');
    expect(res.status).toEqual(200);
  });

  it('Get a products', async () => {
    const res = await request.get('/api/products/2');
    expect(res.status).toEqual(200);
  });

  it('Creates order for user', async () => {
    const payload: Order = {
      id: 2,
      user_id: 2,
      status: 'complete',
    };
    await request
      .post('/api/orders/create')
      .set('Authorization', 'Bearer ' + token)
      .send(payload)
      .expect(200);
  });

  it('Get Orders by user id', async () => {
    const res = await request
      .get('/api/orders/2')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toEqual(200);
  });
});
