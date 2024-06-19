import { Article } from 'typings';

export const packArticle = (selectedTags: string[]): Article | undefined => {
    const elements = document.querySelectorAll('.add-article > div.article');

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
    elements.forEach((item) => articleElements.push(item.outerHTML));

    return {
        creator: '0x0',
        tokenId: '0x1',
        timestamp: Date.now(),

        coverImage: coverImage.src,
        title: title.textContent,
        tags: selectedTags.join('/'),
        description: description.textContent,

        article: articleElements.join(' && '),
    };
};
