import Image from 'next/image';
import Link from 'next/link';

import { toAuthorTag, toDateTag, toTags } from './articleObjects';

import { Article } from 'typings';

import './article-preview.css';

interface Props {
    article: Article;
}

export default function ArticlePreview({ article }: Props) {
    return (
        <article className='preview'>
            <Image src={article.coverImage} alt='article-image' height={1440} width={2880}></Image>
            <div>
                <h2>
                    <span>{article.title}</span>
                </h2>
                <div>
                    <h4>{toAuthorTag(article.creator)}</h4>
                    <h4>{toDateTag(article.timestamp)}</h4>
                </div>
                <h4>{article.description}</h4>
                {toTags(article.tags)}
                <div>
                    <Link id='blue-button' href=''>
                        Read
                    </Link>
                    <Link
                        id='blue-button'
                        href='https://explorer.aptoslabs.com/?network=mainnet'
                        target='_blank'
                    >
                        Open on Explorer
                    </Link>
                </div>
            </div>
        </article>
    );
}
