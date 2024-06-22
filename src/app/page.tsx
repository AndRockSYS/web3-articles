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
                    <Link href={`#${tag}`} id='gray-button' key={tag}>
                        {tag}
                    </Link>
                ))}
            </div>

            <Banner />
            {tags.map((tag, index) => (
                <section key={index}>
                    <h1 id={tag}>{tag}</h1>
                    <div>
                        {articles.map((article, index) =>
                            article.tag == tag ? (
                                <ArticleCell key={index} article={article} />
                            ) : (
                                <></>
                            )
                        )}
                    </div>
                </section>
            ))}
        </main>
    );
}
