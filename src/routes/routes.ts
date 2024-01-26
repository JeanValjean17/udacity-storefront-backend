import express, { Request, Response } from 'express';
import test from './api/test';
import products from './api/products';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).send('main api route');
});

routes.use('/', products);
routes.use('/test', test);

export default routes;
