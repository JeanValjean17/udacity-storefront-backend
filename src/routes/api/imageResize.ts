import express, { Request, Response } from 'express';
import checkThumbPicExists, {
  getExistingPicture,
} from '../../imageProcessing/imageReader';
import resizeImage from '../../imageProcessing/imageProcessing';
import inputUrlCheck from '../../middleware/inputChecker';

const images = express.Router();

images.get('/', inputUrlCheck, async (req: Request, res: Response) => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const doesPicExist = await checkThumbPicExists(
    'assets/out/',
    `${filename}_out.png`,
  );

  if (doesPicExist) {
    res
      .status(200)
      .contentType('png')
      .send(await getExistingPicture('assets/out/', `${filename}.png`));
  } else {
    resizeImage(
      'assets/full/',
      'assets/out/',
      `${filename}.png`,
      width,
      height,
    ).then((image) => {
      res.status(200).contentType('png').send(image);
    });
  }
});

export default images;
