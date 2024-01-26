import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY: jwt.Secret = process.env.TOKEN_SECRET as string;

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Error();
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    next();

    } catch (err: NodeJS.ErrnoException | unknown) {
        const error = err as NodeJS.ErrnoException;
        sendErrorResponse(res, error.message);
    }
}   

const sendErrorResponse = (res: Response, message: string): void => {
    res.status(400).send(message);
  };

  
export default verifyAuthToken;