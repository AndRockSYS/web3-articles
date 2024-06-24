'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { Article } from 'typings';

export const ArticleContext = createContext<{
    articles: Article[];
    setArticles: Dispatch<SetStateAction<Article[]>>;
    banners: string[];
    setBanners: Dispatch<SetStateAction<string[]>>;
}>({
    articles: [],
    setArticles: () => {},
    banners: [],
    setBanners: () => {},
});

export function ArticleProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [banners, setBanners] = useState<string[]>([]);

    return (
        <ArticleContext.Provider
            value={{
                articles,
                setArticles,
                banners,
                setBanners,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
}
