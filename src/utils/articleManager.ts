import { Article } from 'typings';

export const collectData = (creator: string): Article | undefined => {
    const coverImage = document.querySelector(
        '.add-article > .image-container > img'
    ) as HTMLImageElement;
    if (!coverImage.src) return;

    const title = document.querySelector('.add-article > p#title') as HTMLElement;
    if (!title.textContent) return;

    const tag = document.querySelector('.add-article > .tags-input > #tag') as HTMLElement;
    console.log(tag.textContent);
    if (!tag.textContent) return;

    const description = document.querySelector('.add-article > p#description') as HTMLElement;
    if (!description.textContent) return;

    const articleElements: string[] = [];
    const elements = document.querySelectorAll(
        '.add-article > div.article > *'
    ) as NodeListOf<HTMLElement>;
    elements.forEach((item) => {
        item.contentEditable = 'false';
        articleElements.push(item.outerHTML);
    });

    return {
        creator,
        tokenId: '0x0',
        timestamp: Date.now(),

        coverImage: coverImage.src,
        title: title.textContent,
        tag: tag.textContent,
        description: description.textContent,

        article: articleElements.join(''),
    };
};

export const updateImages = async (
    tokenId: string,
    uploadImage: (articleAddress: string, image: string) => Promise<string>
) => {
    const images = document.querySelectorAll(
        '.add-article > .image-container > img, .add-article > .article img'
    ) as NodeListOf<HTMLImageElement>;

    for (const image of images) {
        image.src = await uploadImage(tokenId, image.src);
    }
};
