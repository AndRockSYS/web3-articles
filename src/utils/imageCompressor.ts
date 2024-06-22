import { Image } from 'image-js';

export default async function imageCompressor(imageInput: File) {
    const arrayBuffer = await imageInput.arrayBuffer();

    const bfr = await Image.load(Buffer.from(arrayBuffer));
    const resizedImage = bfr.resize({ width: 640, preserveAspectRatio: true });

    const croppedImage =
        resizedImage.width > 640 && resizedImage.height > 360
            ? resizedImage.crop({
                  width: 640,
                  height: 360,
              })
            : resizedImage;

    return `data:image/png;base64,${Buffer.from(croppedImage.toBuffer()).toString('base64')}`;
}
