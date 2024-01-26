import { Request, Response, NextFunction } from 'express';
import checkThumbPicExists from '../imageProcessing/imageReader';

export const inputUrlCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const doesPicExist = await checkThumbPicExists(
    'assets/out/',
    `${filename}.png`,
  );

  if (!filename) {
    sendErrorResponse(res, 'Please provide the file name');
  }

  if (!doesPicExist) {
    sendErrorResponse(
      res,
      `${filename} file does not exist. Please provide a file name that exists`,
    );
  }

  //|| !width || height <= 0 || width <= 0
  if (!height) {
    console.log('height null');
    sendErrorResponse(res, 'Please provide a valid height input');
  }
  if (!width) {
    sendErrorResponse(res, 'Please provide a valid width input');
  }
  if (height <= 0) {
    sendErrorResponse(res, 'Please provide a positive height input');
  }
  if (width <= 0) {
    sendErrorResponse(res, 'Please provide a positive width input');
  }
  next();
};

const sendErrorResponse = (res: Response, message: string): void => {
  res.status(400).send(message);
};

export default inputUrlCheck;
