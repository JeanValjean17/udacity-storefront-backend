import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';

const resizeImage = async (
  pathToOriginalImage: string,
  outputPath: string,
  filename: string,
  width: number,
  height: number,
): Promise<Buffer> => {
  const buffer = await sharp(path.resolve(pathToOriginalImage + filename))
    .resize(width, height)
    .toBuffer();

  return fs
    .writeFile(path.resolve(outputPath + filename), buffer)
    .then(() => {
      return buffer;
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default resizeImage;
