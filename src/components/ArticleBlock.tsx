import Image from 'next/image';
import Link from 'next/link';

import { ArticleBlock } from 'typings';

interface Props {
    article: ArticleBlock;
}

export default function ArticlePreview({ article }: Props) {
    return (
        <article>
            //* make it links to an NFT
            <Image
                src={
                    'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880'
                }
                alt='article-image'
                height={1440}
                width={2880}
            ></Image>
            <h1>{article.name}</h1>
            <div>
                <h2>{article.creator}</h2>
                <h2>{article.timestamp}</h2>
            </div>
            <h2>{article.description}</h2>
            <div>
                <Link href=''>Read</Link>
                <Link href='https://explorer.aptoslabs.com/?network=mainnet'>Open on Explorer</Link>
            </div>
        </article>
    );
}
