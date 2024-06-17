import Image from 'next/image';
import Link from 'next/link';

import { ArticleBlock } from 'typings';

import './article-preview.css';

interface Props {
    article: ArticleBlock;
}

export default function ArticlePreview({ article }: Props) {
    const author = article.creator.slice(0, 4) + '...' + article.creator.slice(62, 66);

    return (
        <article className='preview'>
            <Image src={article.mainImage} alt='article-image' height={1440} width={2880}></Image>
            <div>
                <h1>
                    <span>{article.name}</span>
                </h1>
                <div>
                    <h2>{author}</h2>
                    <h2>{article.timestamp}</h2>
                </div>
                <h2>{article.description}</h2>
                <div>
                    <Link href=''>Read</Link>
                    <Link href='https://explorer.aptoslabs.com/?network=mainnet'>
                        Open on Explorer
                    </Link>
                </div>
            </div>
        </article>
    );
}
