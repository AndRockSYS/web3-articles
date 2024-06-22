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
        getBanners().then((links) => setBanners(links));
    }, []);

    useEffect(() => {
        if (banners.length < 2) return;

        const images = document.querySelectorAll('.banner > img') as NodeListOf<HTMLImageElement>;
        if (!images) return;

        images.forEach((img) => {
            img.style.opacity = '1';
        });

        new Promise((resolve) => setTimeout(resolve, 6000)).then(() => {
            const shuffled: string[] = [];

            for (let i = 1; i < banners.length; i++) {
                shuffled.push(banners[i]);
            }

            shuffled.push(banners[0]);

            images.forEach((img) => {
                img.style.opacity = '0';
            });

            new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                setBanners(shuffled);
            });
        });
    }, [banners]);

    const isOwner = useMemo(
        () => account?.address.includes(process.env.NEXT_PUBLIC_OWNER as string),
        [account]
    );

    return (
        <div className='banner'>
            {useMemo(
                () => (
                    <Image src={banners[0]} alt='banner' height={150} width={1000} priority />
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
