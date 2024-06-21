'use client';

import Image from 'next/image';
import Link from 'next/link';

import { toAuthorTag, toDateTag, toTag } from '@/utils/tagsConverter';

import { Article } from 'typings';

import './article-cell.css';
import { useRouter } from 'next/navigation';

interface Props {
    article: Article;
}

export default function ArticleCell({ article }: Props) {
    const router = useRouter();

    return (
        <article className='preview' onClick={() => router.push(`/article/${article.tokenId}`)}>
            <Image src={article.coverImage} alt='article-image' height={1440} width={2880}></Image>
            <div>
                {toDateTag(article.timestamp)}
                {toAuthorTag(article.creator)}
                {toTag(article.tag)}
            </div>
            <h2>
                <span>{article.title}</span>
            </h2>
            <h4>{article.description}</h4>
        </article>
    );
}
