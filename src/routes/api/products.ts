import express, { Request, Response } from 'express';
import verifyAuthToken from '../../middleware/jwtAuthChecker';
import { Product, ProductStore } from '../../models/product';

const products = express.Router();
const store = new ProductStore();

products.get(
  '/products',
  express.json(),
  async (req: Request, res: Response) => {
    const result = await store.index();
    res.json(result);
  },
);

products.get(
  '/products/:id',
  express.json(),
  async (req: Request, res: Response) => {
    const result = await store.show(req.params.id);
    res.json(result);
  },
);

products.post(
  '/products',
  verifyAuthToken,
  express.json(),
  async (req: Request, res: Response) => {
    const product: Product = {
      id: 1,
      name: req.body.name,
      price: req.body.price,
    };

    try {
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (err: NodeJS.ErrnoException | unknown) {
      const error = err as NodeJS.ErrnoException;
      res.status(400);
      res.json(error);
    }
  },
);

export default products;
