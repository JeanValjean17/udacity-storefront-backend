import express, { Request, Response } from 'express';
import verifyAuthToken from '../../middleware/jwtAuthChecker';
import { Order, OrderStore } from '../../models/orders';

const orders = express.Router();
const store = new OrderStore();

orders.get(
  '/orders/:userId',
  verifyAuthToken,
  express.json(),
  async (req: Request, res: Response) => {
    try {
      const orders = await store.index();
      const currentOrdersByUser = orders.map((order) => {
        if (order.user_id.toString() === req.params.userId) {
          return order;
        }
      });

      res.json(currentOrdersByUser);
    } catch (err: NodeJS.ErrnoException | unknown) {
      const error = err as NodeJS.ErrnoException;
      res.status(400);
      res.json(error);
    }
  },
);

orders.post(
  '/orders/create',
  express.json(),
  verifyAuthToken,
  async (req: Request, res: Response) => {
    const order: Order = {
      id: 1,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    try {
      const newOrder = await store.create(order);
      res.json(newOrder);
    } catch (err: NodeJS.ErrnoException | unknown) {
      const error = err as NodeJS.ErrnoException;
      res.status(400);
      res.json(error);
    }
  },
);

export default orders;
