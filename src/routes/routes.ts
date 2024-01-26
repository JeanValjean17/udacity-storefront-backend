import express, { Request, Response } from 'express';
import test from './api/test';
import images from './api/imageResize';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).send('main api route');
});

routes.use('/test', test);
routes.use('/imageresize', images);

export default routes;
