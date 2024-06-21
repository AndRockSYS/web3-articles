'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import useTags from '@/hooks/useTags';
import useAptos from '@/hooks/useAptos';

import EditTools from './EditTools';

import { args, packArticle, updateImages } from '@/utils/dataManager';
import { toTags } from '@/utils/tagsConverter';
import imageCompressor from '@/utils/imageCompressor';

import './add-article.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import useFirebase from '@/hooks/useFirebase';

export default function AddArticle() {
    const { account } = useWallet();

    const { freeTags, selectedTags, selectTag, deselectTag } = useTags();
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

    const articleTags = useMemo(() => toTags(selectedTags.join('/'), deselectTag), [selectedTags]);
    const unactiveTags = useMemo(
        () =>
            freeTags.length ? (
                <ul>
                    {freeTags.map((tag) => (
                        <option
                            key={tag}
                            value={tag}
                            onClick={() => {
                                selectTag(tag);
                                openCloseTags();
                            }}
                        >
                            {tag}
                        </option>
                    ))}
                </ul>
            ) : (
                <></>
            ),
        [freeTags]
    );

    const postNewArticle = async () => {
        if (!account) return;
        // const [title, description] = args();
        //const tokenId = await sendArticle(title, description);
        const tokenId = '0x91111';
        await updateImages(tokenId, uploadImage);
        const article = packArticle(account.address, tokenId, selectedTags);
        if (!article) return;
        await addArticle(tokenId, article);
        alert('Article was successfully uploaded');
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
                onInput={(event) => cutToLimit(25, event)}
            ></p>
            <div className='tags-input'>
                {articleTags}
                {useMemo(
                    () =>
                        selectedTags.length < 5 ? (
                            <button id='gray-button' onClick={openCloseTags}>
                                Add Tag
                            </button>
                        ) : (
                            <></>
                        ),
                    [selectedTags]
                )}
                {unactiveTags}
            </div>
            <p
                custom-placeholder='Now a short description'
                id='description'
                contentEditable
                onInput={(event) => cutToLimit(50, event)}
            ></p>
            <div className='article'>
                <p id='article' contentEditable custom-placeholder='What do you want to do'></p>
            </div>
            <EditTools />
        </main>
    );
}
