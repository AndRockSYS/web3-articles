'use client';

import Image from 'next/image';

import './add-article.css';

export default function AddArticle() {
    const cutToLimit = (limit: number, event: React.FormEvent<HTMLParagraphElement>) => {
        const value = event.currentTarget.textContent;
        if (value) event.currentTarget.textContent = value.slice(0, limit);
    };

    const elements = [
        { value: 'image', name: 'Image' },
        { value: 'video', name: 'Video' },
        { value: 'h2', name: 'Heading 2' },
        { value: 'h3', name: 'Heading 3' },
        { value: 'link', name: 'Link' },
    ];

    return (
        <main className='add-article'>
            <p
                custom-placeholder='Give it a title'
                id='title'
                contentEditable
                onInput={(event) => cutToLimit(25, event)}
            ></p>
            <p
                custom-placeholder='Now a short description'
                id='description'
                contentEditable
                onInput={(event) => cutToLimit(50, event)}
            ></p>
            <p custom-placeholder='What do you want to write?' id='article' contentEditable></p>
            <div>
                <ul>
                    {elements.map((element) => (
                        <li value={element.value}>
                            <Image
                                src={`/icons/elements/${
                                    element.value.includes('h') ? 'heading' : element.value
                                }.svg`}
                                alt='add'
                                width={32}
                                height={32}
                            />
                            {element.name}
                        </li>
                    ))}
                </ul>
                <button>
                    <Image src={'/icons/add.svg'} alt='add' width={32} height={32}></Image>Add
                    Element
                </button>
            </div>
        </main>
    );
}
