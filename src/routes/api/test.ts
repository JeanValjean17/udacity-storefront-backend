import express, { Request, Response } from 'express';

const test = express.Router();

test.get('/', (req: Request, res: Response) => {
  res.status(200).send('test route');
});

export default test;
