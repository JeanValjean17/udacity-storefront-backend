import express, { Request, Response } from 'express';
import verifyAuthToken from '../../middleware/jwtAuthChecker';
import { User, UserStore } from '../../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const users = express.Router();
const store = new UserStore();
dotenv.config();
const SECRET_KEY: jwt.Secret = process.env.TOKEN_SECRET as string;

users.get('/users', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err: NodeJS.ErrnoException | unknown) {
    const error = err as NodeJS.ErrnoException;
    res.json(error);
  }
});

users.get(
  '/users/show/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const users = await store.show(req.params.id);
      res.json(users);
    } catch (err: NodeJS.ErrnoException | unknown) {
      const error = err as NodeJS.ErrnoException;
      res.status(400);
      res.json(error);
    }
  },
);

users.post(
  '/users/create',
  express.json(),
  async (req: Request, res: Response) => {
    const user: User = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
      id: 1,
    };

    try {
      //still need to encrypt with bencrypt
      const newUser = await store.create(user);
      const token = jwt.sign({ user: newUser }, SECRET_KEY);
      res.json(token);
    } catch (err: NodeJS.ErrnoException | unknown) {
      const error = err as NodeJS.ErrnoException;
      res.status(400);
      res.json(error);
    }

    res.status(200).send('users route ' + req.body);
  },
);

export default users;
