'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import { bannerCompressor } from '@/utils/imageCompressor';

import './banner.css';

interface Props {
    banners: string[];
    getBanners: () => Promise<string[]>;
    setBanners: Dispatch<SetStateAction<string[]>>;
    uploadImage: (articleAddress: string, image: string) => Promise<string>;
    deleteArticle: (articleAddress: string) => Promise<void>;
}

export default function Banner({
    banners,
    getBanners,
    setBanners,
    uploadImage,
    deleteArticle,
}: Props) {
    const { account } = useWallet();

    let curr = 0;

    useEffect(() => {
        if (!banners.length) getBanners().then((data) => setBanners(data));
        else autoLoop();
    }, [banners.length]);

    const autoLoop = async () => {
        if (banners.length < 2) return;

        const image = document.querySelector('div.banner img.banner') as HTMLImageElement;
        if (!image) return;

        if (curr == banners.length - 1) curr = 0;
        else curr++;

        await new Promise((resolve) => setTimeout(resolve, 3000));

        image.style.opacity = '0';

        await new Promise((resolve) => setTimeout(resolve, 500));

        image.src = banners[curr];

        image.style.opacity = '1';

        autoLoop();
    };

    const shuffle = async (isNext: boolean) => {
        if (banners.length < 2) return;

        const image = document.querySelector('.banner img.banner') as HTMLImageElement;

        image.style.opacity = '0';

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (isNext) {
            if (curr == banners.length - 1) curr = 0;
            else curr++;
        } else {
            if (curr == 0) curr = banners.length - 1;
            else curr--;
        }

        image.src = banners[curr];

        image.style.opacity = '1';
    };

    const isOwner = useMemo(
        () => account?.address.includes(process.env.NEXT_PUBLIC_OWNER as string),
        [account]
    );

    return (
        <div className='banner'>
            <div className='image-container'>
                <Image
                    src={'/icons/arrow-left.svg'}
                    alt='left'
                    height={32}
                    width={32}
                    onClick={() => shuffle(false)}
                />
                <Image
                    className='banner'
                    src={'/logo.svg'}
                    alt='banner'
                    height={150}
                    width={1000}
                    priority
                />
                <Image
                    src={'/icons/arrow-right.svg'}
                    alt='left'
                    height={32}
                    width={32}
                    onClick={() => shuffle(true)}
                />
            </div>
            {isOwner ? (
                <>
                    <button id='blue-button'>
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            onChange={async (event) => {
                                const file = event.target.files?.[0];
                                if (!file) return;
                                const image = await bannerCompressor(file);
                                await uploadImage('banner', image);
                            }}
                        />
                        Add
                    </button>
                    <button id='red-button' onClick={async () => await deleteArticle('banner')}>
                        Delete
                    </button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
