import { Image } from 'image-js';

export default async function imageCompressor(imageInput: File) {
    const arrayBuffer = await imageInput.arrayBuffer();

    const bfr = await Image.load(Buffer.from(arrayBuffer));
    const resizedImage = bfr.resize({ height: 600, preserveAspectRatio: true });
    const buffer = resizedImage.toBuffer();

    return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
}
