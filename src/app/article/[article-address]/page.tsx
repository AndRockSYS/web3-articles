'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import useFirebase from '@/hooks/useFirebase';
import { toAuthorTag, toDateTag, toTag } from '@/utils/tagsConverter';

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
            <div className='additional'>
                {toDateTag(article.timestamp)} {toTag(article.tag)}
            </div>

            <h1>
                <span>{article.title}</span>
            </h1>
            <div className='author'>{toAuthorTag(article.creator)}</div>
            <Image src={article?.coverImage} alt='cover-image' height={360} width={640}></Image>
            <article dangerouslySetInnerHTML={{ __html: article.article }} />
        </main>
    );
}
