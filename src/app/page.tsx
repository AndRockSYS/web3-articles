import ArticlePreview from '@/components/ArticlePreview';

import { Article } from 'typings';

import './homepage.css';

export default function Home() {
    const articles: Article[] = [
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'The name of this article is very very long idk why',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description:
                ' Here is my testing description, I wonder how to make that, so read. Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            title: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            coverImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
            article: '',
        },
    ];

    return (
        <main className='home'>
            <section>
                {articles.map((article) => (
                    <ArticlePreview key={article.timestamp} article={article} />
                ))}
            </section>
        </main>
    );
}
