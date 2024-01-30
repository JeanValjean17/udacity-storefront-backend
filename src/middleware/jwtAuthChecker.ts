import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY: jwt.Secret = process.env.TOKEN_SECRET as string;

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      throw new Error('Not authorized for this action');
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err: NodeJS.ErrnoException | unknown) {
    const error = err as NodeJS.ErrnoException;
    sendErrorResponse(res, error.message);
  }
};

const sendErrorResponse = (res: Response, message: string): void => {
  res.status(400).send(message);
};

export default verifyAuthToken;
