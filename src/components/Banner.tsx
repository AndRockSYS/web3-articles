'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import useFirebase from '@/hooks/useFirebase';

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

        new Promise((resolve) => setTimeout(resolve, 7000)).then(() => {
            const shuffled: string[] = [];

            for (let i = 1; i < banners.length; i++) {
                shuffled.push(banners[i]);
            }

            shuffled.push(banners[0]);

            setBanners(shuffled);
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
                    <Image src={banners[0]} alt='banner' height={150} width={1000} />
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
                                const image = await file.arrayBuffer();
                                await uploadImage(
                                    'banner',
                                    `data:image/png;base64,${Buffer.from(image).toString('base64')}`
                                );
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
