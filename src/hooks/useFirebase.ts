import { Article } from 'typings';

const useFirebase = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL as string}/api/firebase`;

    const getArticle = async (
        articleAddress?: string
    ): Promise<Article | { [key: string]: Article } | undefined> => {
        const response = await fetch(url, {
            method: 'GET',
            body: JSON.stringify({
                articleAddress,
            }),
        });

        const json = await response.json();

        return json.data;
    };

    const addArticle = async (articleAddress: string, article: Article) => {
        await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                articleAddress,
                article,
            }),
        });
    };

    const deleteArticle = async (articleAddress: string) => {
        await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({
                articleAddress,
            }),
        });
    };

    return { addArticle, getArticle, deleteArticle };
};

export default useFirebase;
