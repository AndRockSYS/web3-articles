'use client';

import { useEffect, useState } from 'react';
import { Article } from 'typings';

const useFirebase = () => {
    const [articles, setArticles] = useState<{ [key: string]: Article }>({});

    const url = `${process.env.NEXT_PUBLIC_APP_URL as string}/api/firebase`;

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ articleAddress: undefined }),
        }).then(async (response) => {
            const json = await response.json();
            setArticles(json.data);
        });
    }, []);

    const getArticle = async (articleAddress: string): Promise<Article> => {
        const response = await fetch(url, {
            method: 'POST',
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

    return { articles, addArticle, getArticle, deleteArticle };
};

export default useFirebase;
