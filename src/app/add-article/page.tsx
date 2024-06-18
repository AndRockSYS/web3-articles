'use client';

import { Image as IMG } from 'image-js';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import useElements from '@/hooks/useElements';
import useArticle from '@/hooks/useArticle';

import './add-article.css';

export default function AddArticle() {
    const { addElement, addImage, getElements } = useElements();
    const { packArticle } = useArticle();

    const [coverImage, setCoverImage] = useState('');

    const [isLinkOpened, setIsLinkOpened] = useState(false);

    const cutToLimit = (limit: number, event: React.FormEvent<HTMLParagraphElement>) => {
        const value = event.currentTarget.textContent;
        if (value) event.currentTarget.textContent = value.slice(0, limit);
    };

    const elements = [
        { value: 'image', name: 'Image' },
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
        const bfr = await IMG.load(Buffer.from(arrayBuffer));
        const resizedImage = bfr.resize({ height: 600, preserveAspectRatio: true });
        const buffer = resizedImage.toBuffer();
        setCoverImage(`data:image/png;base64,${Buffer.from(buffer).toString('base64')}`);
    };

    return (
        <main className='add-article'>
            <button id='blue-button' onClick={packArticle}>
                <Image src={'/icons/send.svg'} alt='send' width={32} height={32}></Image>
                Publish
            </button>
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
            {useMemo(
                () =>
                    isLinkOpened ? (
                        <input
                            className='link-input'
                            type='text'
                            placeholder='Paste the link'
                            onChange={(event) => {
                                const elements = getElements();
                                elements.forEach((item) => {
                                    if (
                                        item.tagName == 'A' &&
                                        (item as HTMLAnchorElement).href == ''
                                    )
                                        (item as HTMLAnchorElement).href = event.target.value;
                                });
                                setIsLinkOpened(false);
                            }}
                        />
                    ) : (
                        <></>
                    ),
                [isLinkOpened]
            )}

            <div className='article'>
                <p id='article' contentEditable custom-placeholder='What do you want to do'></p>
            </div>

            <div className='tool'>
                <ul>
                    {elements.map((element) => (
                        <li
                            key={element.name}
                            value={element.value}
                            onClick={() => {
                                if (element.value == 'link') setIsLinkOpened(true);
                                openCloseElements();
                                if (element.value != 'image') addElement(element.value);
                            }}
                        >
                            {element.value == 'image' ? (
                                <input
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    onChange={(event) => {
                                        if (!event.target.files) return;
                                        addImage(event.target.files[0]);
                                    }}
                                />
                            ) : (
                                <></>
                            )}
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
