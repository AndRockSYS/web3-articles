'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import useFirebase from '@/hooks/useFirebase';
import useTags from '@/hooks/useTags';
import useAptos from '@/hooks/useAptos';

import EditTools from './EditTools';

import { collectData, updateImages } from '@/utils/articleManager';
import { toTag } from '@/utils/tagsConverter';
import { imageCompressor } from '@/utils/imageCompressor';

import './add-article.css';

export default function AddArticle() {
    const { account } = useWallet();

    const { tags, selectedTag, setSelectedTag } = useTags();
    const { sendArticle } = useAptos();
    const { addArticle, uploadImage } = useFirebase();

    const [coverImage, setCoverImage] = useState('');

    const cutToLimit = (limit: number, event: React.FormEvent<HTMLParagraphElement>) => {
        const value = event.currentTarget.textContent;
        if (value) event.currentTarget.textContent = value.slice(0, limit);
    };

    const openCloseTags = () => {
        const list = document.querySelector(
            'main.add-article > div.tags-input > ul'
        ) as HTMLElement;

        list.style.display = list.style.display.includes('none') ? 'block' : 'none';
    };

    const postNewArticle = async () => {
        try {
            if (!account) {
                alert('Connect Wallet');
                return;
            }

            const article = collectData(account.address);
            if (!article) {
                alert('Fill the article');
                return;
            }

            const tokenId = await sendArticle(article.title, article.description);

            article.tokenId = tokenId;

            await updateImages(tokenId, uploadImage);
            await addArticle(tokenId, article);

            alert('Article was added');
        } catch (error) {
            alert('An error occured');
        }
    };

    return (
        <main className='add-article'>
            <button id='blue-button' onClick={() => postNewArticle()}>
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
                                onChange={async (event) => {
                                    if (!event.target.files) return;
                                    const src = await imageCompressor(event.target.files[0]);
                                    setCoverImage(src);
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
                onInput={(event) => cutToLimit(128, event)}
            ></p>
            <div className='tags-input'>
                {useMemo(
                    () =>
                        !selectedTag ? (
                            <button id='gray-button' onClick={openCloseTags}>
                                Add Tag
                            </button>
                        ) : (
                            toTag(selectedTag, setSelectedTag)
                        ),
                    [selectedTag]
                )}
                <ul>
                    {tags.map((tag) => (
                        <option
                            key={tag}
                            value={tag}
                            onClick={() => {
                                setSelectedTag(tag);
                                openCloseTags();
                            }}
                        >
                            {tag}
                        </option>
                    ))}
                </ul>
            </div>
            <p
                custom-placeholder='Now a short description'
                id='description'
                contentEditable
                onInput={(event) => cutToLimit(2048, event)}
            ></p>
            <div className='article'>
                <p
                    id='article'
                    contentEditable
                    custom-placeholder='What do you want to write about?'
                ></p>
            </div>
            <EditTools />
        </main>
    );
}
