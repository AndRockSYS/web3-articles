import { Article } from 'typings';

export const packArticle = (): Article | undefined => {
    const elements = document.querySelectorAll('.add-article > div.article');

    const coverImage = document.querySelector(
        '.add-article > .image-container > img'
    ) as HTMLImageElement;
    const title = document.querySelector('.add-aricle > p#title') as HTMLElement;
    const tags = document.querySelectorAll(
        '.add-article > div.tags-input > .tags > *'
    ) as NodeListOf<HTMLElement>;
    const description = document.querySelector('.add-aricle > p#description') as HTMLElement;

    if (!title.textContent || !description.textContent || !coverImage) {
        alert('Fill the article first');
        return;
    }

    const tagsList: string[] = [];
    tags.forEach((item) => {
        if (item.textContent) tagsList.push(item.textContent);
    });

    const articleElements: string[] = [];
    elements.forEach((item) => articleElements.push(item.outerHTML));

    return {
        creator: '0x0',
        timestamp: Date.now(),

        coverImage: coverImage.src,
        title: title.textContent,
        tags: tagsList.join('/'),
        description: description.textContent,

        article: articleElements.join(' && '),
    };
};
