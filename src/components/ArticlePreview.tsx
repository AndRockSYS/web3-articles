import Image from 'next/image';
import Link from 'next/link';

import { toAuthorTag, toDateTag, toTags } from './articleObjects';

import { ArticleBlock } from 'typings';

import './article-preview.css';

interface Props {
    article: ArticleBlock;
}

export default function ArticlePreview({ article }: Props) {
    return (
        <article className='preview'>
            <Image src={article.mainImage} alt='article-image' height={1440} width={2880}></Image>
            <div>
                <h1>
                    <span>{article.name}</span>
                </h1>
                <div>
                    <h2>{toAuthorTag(article.creator)}</h2>
                    <h2>{toDateTag(article.timestamp)}</h2>
                </div>
                <h2>{article.description}</h2>
                {toTags(article.tags)}
                <div>
                    <Link href=''>Read</Link>
                    <Link href='https://explorer.aptoslabs.com/?network=mainnet' target='_blank'>
                        Open on Explorer
                    </Link>
                </div>
            </div>
        </article>
    );
}
