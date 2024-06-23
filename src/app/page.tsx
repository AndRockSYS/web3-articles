'use client';

import Link from 'next/link';

import ArticleCell from '@/components/ArticleCell';
import Banner from '@/components/Banner';

import useFirebase from '@/hooks/useFirebase';
import useTags from '@/hooks/useTags';

import './homepage.css';

export default function Home() {
    const { articles } = useFirebase();
    const { tags } = useTags();

    return (
        <main className='home'>
            <div className='tag-list'>
                {tags.map((tag) => (
                    <Link
                        href={{ pathname: '/category', query: { category: tag } }}
                        id='gray-button'
                        key={tag}
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            <Banner />
            {tags.map((tag, index) => {
                let amount = 0;
                return (
                    <section key={index}>
                        <div className='name'>
                            <h1 id={tag}>{tag}</h1>
                            <Link
                                href={{ pathname: '/category', query: { category: tag } }}
                                id='blue-button'
                            >
                                See All
                            </Link>
                        </div>
                        <div className='articles'>
                            {articles.map((article, index) => {
                                if (amount == 3) return <></>;
                                if (article.tag == tag) amount++;

                                return article.tag == tag ? (
                                    <ArticleCell key={article.timestamp} article={article} />
                                ) : (
                                    <></>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </main>
    );
}
