import express, { Request, Response } from 'express';
import verifyAuthToken from '../../middleware/jwtAuthChecker';

const products = express.Router();

products.get('/products', (req: Request, res: Response) => {
  res.status(200).send('products route');
});

products.get('/products/:id', (req: Request, res: Response) => {
  res.status(200).send('products route ' + req.params.id);
});

products.post('/products', verifyAuthToken, (req: Request, res: Response) => {
  res.status(200).send('products route ' + req.body);
});

export default products;
