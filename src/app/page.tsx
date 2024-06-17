import ArticlePreview from '@/components/ArticlePreview';

import { ArticleBlock } from 'typings';

import './homepage.css';

export default function Home() {
    const articles: ArticleBlock[] = [
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description:
                ' Here is my testing description, I wonder how to make that, so read. Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
        {
            creator: '0x497b83b8cd2ae8b51592fcb6525dca51d43cb0c95601323aba4f2aa44b3dfdc1',
            timestamp: Date.now(),

            name: 'Test article',
            description: ' Here is my testing description, I wonder how to make that, so read.',
            mainImage:
                'https://images.mirror-media.xyz/publication-images/4zFqsBnSZL1IzFogWcsba.png?height=1440&width=2880',
            tags: 'DeFi/Gaming/DAO/AI',
        },
    ];

    return (
        <main className='home'>
            <aside>The home for web3 publishing</aside>
            <section>
                {articles.map((article) => (
                    <ArticlePreview key={article.timestamp} article={article} />
                ))}
            </section>
        </main>
    );
}
