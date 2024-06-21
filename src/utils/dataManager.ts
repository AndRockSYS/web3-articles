import { Article } from 'typings';

export const args = (): [string, string] => {
    const title = document.querySelector('.add-article > p#title') as HTMLElement;
    const description = document.querySelector('.add-article > p#description') as HTMLElement;
    return [
        title.textContent ? title.textContent : '',
        description.textContent ? description.textContent : '',
    ];
};

export const updateImages = async (
    tokenId: string,
    uploadImage: (articleAddress: string, image: string) => Promise<string>
) => {
    const images = document.querySelectorAll(
        '.add-article > .image-container > img, .add-article > .article img'
    ) as NodeListOf<HTMLImageElement>;
    images.forEach(async (image) => {
        image.src = await uploadImage(tokenId, image.src);
    });
};

export const packArticle = (
    creator: string,
    tokenId: string,
    selectedTags: string[]
): Article | undefined => {
    const elements = document.querySelectorAll(
        '.add-article > div.article > *'
    ) as NodeListOf<HTMLElement>;

    const coverImage = document.querySelector(
        '.add-article > .image-container > img'
    ) as HTMLImageElement;
    const title = document.querySelector('.add-article > p#title') as HTMLElement;
    const description = document.querySelector('.add-article > p#description') as HTMLElement;

    if (!title.textContent || !description.textContent || !coverImage) {
        alert('Fill the article first');
        return;
    }

    const articleElements: string[] = [];
    elements.forEach((item) => {
        item.contentEditable = 'false';
        articleElements.push(item.outerHTML);
    });

    return {
        creator,
        tokenId,
        timestamp: Date.now(),

        coverImage: coverImage.src,
        title: title.textContent,
        tags: selectedTags.join('/'),
        description: description.textContent,

        article: articleElements.join(''),
    };
};
