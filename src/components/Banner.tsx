'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import useFirebase from '@/hooks/useFirebase';

import { bannerCompressor } from '@/utils/imageCompressor';

import './banner.css';

export default function Banner() {
    const { account } = useWallet();
    const { uploadImage, getBanners, deleteArticle } = useFirebase();

    const [banners, setBanners] = useState<string[]>([]);

    useEffect(() => {
        getBanners().then((links) => {
            setBanners(links);
            if (links.length > 1 && !isPlaying) {
                isPlaying = true;
                loop(links);
            }
        });
    }, []);

    let isPlaying = false;
    const loop = async (links: string[]) => {
        await new Promise((resolve) => setTimeout(resolve, 6000));
        await shuffle(links, true);
        loop(links);
    };

    const shuffle = async (links: string[], isNext: boolean) => {
        if (links.length < 2) return;

        const image = document.querySelector('.banner img.banner') as HTMLImageElement;

        const shuffled: string[] = [];

        if (isNext) {
            for (let i = 1; i < links.length; i++) {
                shuffled.push(links[i]);
            }

            shuffled.push(links[0]);
        } else {
            shuffled.push(links[links.length - 1]);

            for (let i = 0; i < links.length - 1; i++) {
                shuffled.push(links[i]);
            }
        }

        image.style.opacity = '0';

        await new Promise((resolve) => setTimeout(resolve, 500));

        setBanners(shuffled);
        image.style.opacity = '1';
    };

    const isOwner = useMemo(
        () => account?.address.includes(process.env.NEXT_PUBLIC_OWNER as string),
        [account]
    );

    return (
        <div className='banner'>
            {useMemo(
                () =>
                    banners.length ? (
                        <div className='image-container'>
                            <Image
                                src={'/icons/arrow-left.svg'}
                                alt='left'
                                height={32}
                                width={32}
                                onClick={() => shuffle(banners, false)}
                            />
                            <Image
                                className='banner'
                                src={banners[0]}
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
                                onClick={() => shuffle(banners, true)}
                            />
                        </div>
                    ) : (
                        <></>
                    ),
                [banners]
            )}
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
