import { Article } from 'typings';

const useArticle = () => {
    const packArticle = () => {
        const elements = document.querySelectorAll('.add-article > div.article');

        const coverImage = document.querySelector(
            '.add-article > .image-container > img'
        ) as HTMLImageElement;
        const title = document.querySelector('.add-aricle > p#title') as HTMLElement;
        const description = document.querySelector('.add-aricle > p#description') as HTMLElement;

        if (!title.textContent || !description.textContent || !coverImage) {
            alert('Fill the article first');
            return;
        }

        const articleElements: string[] = [];
        elements.forEach((item) => articleElements.push(item.outerHTML));

        const article: Article = {
            creator: '0x0',
            timestamp: Date.now(),

            coverImage: coverImage.src,
            title: title.textContent,
            tags: '',
            description: description.textContent,

            article: articleElements.join(' && '),
        };
    };

    return { packArticle };
};

export default useArticle;
