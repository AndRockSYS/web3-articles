'use client';

import Image from 'next/image';

import { useMemo, useState } from 'react';

import './add-article.css';

export default function AddArticle() {
    const [coverImage, setCoverImage] = useState('');

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

    const openCloseElements = () => {
        const list = document.querySelector('main.add-article > div > ul') as HTMLElement;
        list.style.display = list.style.display.includes('none') ? 'block' : 'none';
    };

    const handleImageInput = async (image: File) => {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        setCoverImage(`data:image/png;base64,${buffer.toString('base64')}`);
    };

    return (
        <main className='add-article'>
            {useMemo(
                () =>
                    coverImage ? (
                        <div className='image-container'>
                            <Image
                                src={coverImage}
                                alt='cover'
                                width={1920}
                                height={1080}
                                objectFit='cover'
                            />
                        </div>
                    ) : (
                        <div id='gray-button' className='cover-input'>
                            <input
                                type='file'
                                accept='image/png, image/jpeg'
                                onChange={(event) => {
                                    if (!event.target.files) return;
                                    handleImageInput(event.target.files[0]);
                                }}
                            />
                            <Image
                                src={'/icons/cover-image.svg'}
                                alt='cover-image'
                                width={32}
                                height={32}
                            />
                            Cover Image
                        </div>
                    ),
                [coverImage]
            )}

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
            <div className='article'>
                <p custom-placeholder='What do you want to write?' id='article' contentEditable></p>
            </div>
            <div className='tool'>
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
                <button id='gray-button' onClick={openCloseElements}>
                    <Image src={'/icons/add.svg'} alt='add' width={32} height={32} />
                    Add Element
                </button>
            </div>
        </main>
    );
}
