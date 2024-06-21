'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import useFirebase from '@/hooks/useFirebase';
import { toAuthorTag, toDateTag, toTags } from '@/utils/tagsConverter';

import { Article } from 'typings';

import './article.css';

export default function ArticlePage() {
    const path = usePathname();
    const { getArticle } = useFirebase();

    const [article, setArticle] = useState<Article>();

    useEffect(() => {
        getArticle(path.split('/')[2]).then((data) => setArticle(data));
    }, [path]);

    if (!article)
        return (
            <main className='loading'>
                <h1>Loading the article...</h1>
            </main>
        );

    return (
        <main className='article'>
            <Image src={article?.coverImage} alt='cover-image' height={360} width={640}></Image>
            <h1>{article.title}</h1>
            {toTags(article.tags)}
            <div className='author'>
                {toAuthorTag(article.creator)}
                {toDateTag(article.timestamp)}
            </div>
            <article dangerouslySetInnerHTML={{ __html: article.article }} />
        </main>
    );
}
