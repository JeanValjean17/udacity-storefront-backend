//import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

export const checkThumbPicExists = async (
  picturePath: string,
  filename: string,
): Promise<boolean> => {
  try {
    const dir = path.resolve(picturePath + filename);
    await fs.open(dir, 'r');

    return new Promise((resolve) => {
      resolve(true);
    });
  } catch (e: NodeJS.ErrnoException | unknown) {
    if (isNodeError(e) && e.code === 'ENOENT') {
      return new Promise((reject) => {
        reject(false);
      });
    }
    return new Promise((reject) => {
      reject(false);
    });
  }
};

export const getExistingPicture = async (
  picturePath: string,
  filename: string,
): Promise<Buffer> => {
  const pic = await fs.readFile(path.resolve(picturePath + filename));
  return pic;
};

/**
 * @param error the error object.
 * @returns if given error object is a NodeJS error.
 */
const isNodeError = (error: Error | unknown): error is NodeJS.ErrnoException =>
  error instanceof Error;

export default checkThumbPicExists;
