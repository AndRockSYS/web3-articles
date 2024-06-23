'use client';

import { useContext, useEffect } from 'react';

import { sendArticleRequest, sendImageRequest } from '@/utils/firebase';

import { Article } from 'typings';
import { ArticleContext } from '@/context/ArticleProvider';

const useFirebase = () => {
    const { articles, setArticles } = useContext(ArticleContext);

    useEffect(() => {
        if (!articles.length)
            sendArticleRequest('POST').then((data) => {
                const sorted = Object.values<Article>(data).sort(
                    (a, b) => b.timestamp - a.timestamp
                );
                setArticles(sorted);
            });
    }, []);

    const getBanners = async (): Promise<string[]> => {
        return await sendImageRequest('POST', 'banner');
    };

    const getArticle = async (articleAddress: string): Promise<Article> => {
        if (articles.length) {
            for (let article of articles) {
                if (article.tokenId == articleAddress) return article;
            }
        }
        return await sendArticleRequest('POST', articleAddress);
    };

    const uploadImage = async (articleAddress: string, image: string): Promise<string> => {
        return await sendImageRequest('PUT', articleAddress, image);
    };

    const addArticle = async (articleAddress: string, article: Article) => {
        return await sendArticleRequest('PUT', articleAddress, article);
    };

    const deleteArticle = async (articleAddress: string) => {
        await sendImageRequest('DELETE', articleAddress);
        await sendArticleRequest('DELETE', articleAddress);
    };

    return { articles, addArticle, uploadImage, getArticle, deleteArticle, getBanners };
};

export default useFirebase;
