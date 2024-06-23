import { Image } from 'image-js';

export async function imageCompressor(imageInput: File) {
    const arrayBuffer = await imageInput.arrayBuffer();

    const bfr = await Image.load(Buffer.from(arrayBuffer));
    const resizedImage = bfr.resize({ width: 768, preserveAspectRatio: true });

    const croppedImage =
        resizedImage.width > 768 && resizedImage.height > 432
            ? resizedImage.crop({
                  width: 768,
                  height: 432,
              })
            : resizedImage;

    return `data:image/png;base64,${Buffer.from(croppedImage.toBuffer()).toString('base64')}`;
}

export async function bannerCompressor(imageInput: File) {
    const arrayBuffer = await imageInput.arrayBuffer();

    const bfr = await Image.load(Buffer.from(arrayBuffer));
    const resizedImage = bfr.resize({ width: 1500, height: 300, preserveAspectRatio: true });

    return `data:image/png;base64,${Buffer.from(resizedImage.toBuffer()).toString('base64')}`;
}
