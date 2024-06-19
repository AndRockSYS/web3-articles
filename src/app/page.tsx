'use client';

import { useMemo } from 'react';

import ArticleCell from '@/components/ArticleCell';

import useFirebase from '@/hooks/useFirebase';

import './homepage.css';

export default function Home() {
    const { articles } = useFirebase();

    const cells = useMemo(() => {
        if (!articles) return <></>;
        return Object.values(articles).map((article) => (
            <ArticleCell key={article.tokenId} article={article} />
        ));
    }, [articles]);

    return (
        <main className='home'>
            <section>{cells}</section>
        </main>
    );
}
