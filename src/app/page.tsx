'use client';

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
            <Banner />
            {tags.map((tag, index) => (
                <section key={index}>
                    <h1>{tag}</h1>
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
