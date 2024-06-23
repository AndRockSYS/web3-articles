'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { Article } from 'typings';

export const ArticleContext = createContext<{
    articles: Article[];
    setArticles: Dispatch<SetStateAction<Article[]>>;
}>({
    articles: [],
    setArticles: () => {},
});

export function ArticleProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [articles, setArticles] = useState<Article[]>([]);

    return (
        <ArticleContext.Provider
            value={{
                articles,
                setArticles,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
}
