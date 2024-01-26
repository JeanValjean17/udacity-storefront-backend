import { checkThumbPicExists } from '../imageProcessing/imageReader';
import resizeImage from '../imageProcessing/imageProcessing';

describe('Image Processing Tests', () => {
  it('Should check that test resized image is available', async () => {
    const exist = await checkThumbPicExists('assets/tests/', 'Bliss.png');
    expect(exist).toBe(true);
  });
  it('Should check that test resized image is NOT available', async () => {
    const exist = await checkThumbPicExists('assets/tests/', 'Bliss222.png');
    expect(exist).toBe(false);
  });
  it('Should successfully resize image', async () => {
    const buffer = await resizeImage(
      'assets/full/',
      'assets/tests/',
      'Bliss.png',
      1024,
      1024,
    );
    expect(buffer).toBeInstanceOf(Buffer);
  });
});
