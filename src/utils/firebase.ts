import { Article } from 'typings';

export const sendArticleRequest = async (
    method: string,
    articleAddress?: string,
    article?: Article
): Promise<any> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL as string}/api/firebase/articles`,
        {
            method,
            body: JSON.stringify({
                articleAddress,
                article,
            }),
        }
    );
    const json = await response.json();

    return json.data;
};

export const sendImageRequest = async (
    method: string,
    articleAddress?: string,
    image?: string
): Promise<any> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL as string}/api/firebase/images`,
        {
            method,
            body: JSON.stringify({
                articleAddress,
                image,
            }),
        }
    );
    const json = await response.json();

    return json.link;
};
