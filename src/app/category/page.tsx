'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import ArticleCell from '@/components/ArticleCell';

import useFirebase from '@/hooks/useFirebase';
import { useMemo } from 'react';

import './category.css';

function SearchParams() {
    const searchParams = useSearchParams();
    const { articles } = useFirebase();

    const tag = searchParams.get('category');

    return (
        <main className='category'>
            <h1>{tag}</h1>
            <div>
                {useMemo(() => {
                    return articles.map((article) =>
                        article.tag == tag ? (
                            <ArticleCell key={article.tokenId} article={article} />
                        ) : (
                            <></>
                        )
                    );
                }, [articles])}
            </div>
        </main>
    );
}

export default function Category() {
    return (
        <Suspense>
            <SearchParams />
        </Suspense>
    );
}
