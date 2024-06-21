'use client';

import { useMemo, useState } from 'react';

import ArticleCell from '@/components/ArticleCell';

import useFirebase from '@/hooks/useFirebase';

import { sortByTag } from '@/utils/sorting';

import './homepage.css';

export default function Home() {
    const { articles, setArticles } = useFirebase();

    const cells = useMemo(() => {
        if (!articles) return <></>;
        return articles.map((article) => <ArticleCell key={article.tokenId} article={article} />);
    }, [articles]);

    return (
        <main className='home'>
            <div className='sorting'>
                {['DeFi', 'AI', 'GameFi', 'RWA', 'Other'].map((tag) => (
                    <button
                        key={tag}
                        id='blue-button'
                        onClick={() => {
                            setArticles(sortByTag([...articles], tag));
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <section>{cells}</section>
        </main>
    );
}
