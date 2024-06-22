'use client';

import { useEffect, useState } from 'react';

import { sendArticleRequest, sendImageRequest } from '@/utils/firebase';

import { Article } from 'typings';

const useFirebase = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        sendArticleRequest('POST').then((data) => setArticles(Object.values(data)));
    }, []);

    const getBanners = async (): Promise<string[]> => {
        return await sendImageRequest('POST', 'banner');
    };

    const getArticle = async (articleAddress: string): Promise<Article> => {
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
