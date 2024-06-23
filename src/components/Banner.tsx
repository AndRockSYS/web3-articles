'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

import useFirebase from '@/hooks/useFirebase';

import { bannerCompressor } from '@/utils/imageCompressor';

import './banner.css';

export default function Banner() {
    const { account } = useWallet();
    const { uploadImage, getBanners, deleteArticle } = useFirebase();

    const [banners, setBanners] = useState<string[]>([]);
    const [slide, setSlide] = useState(0);

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        getBanners().then((links) => setBanners(links));
    }, []);

    const autoLoop = async (curr: number) => {
        if (banners.length < 2 || !imageRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 3000));

        imageRef.current.style.opacity = '0';

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (curr == banners.length - 1) curr = 0;
        else curr++;

        imageRef.current.src = banners[curr];

        imageRef.current.style.opacity = '1';

        autoLoop(curr);
    };

    const shuffle = async (isNext: boolean) => {
        const image = document.querySelector('.banner img.banner') as HTMLImageElement;
        image.style.opacity = '0';

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (banners.length < 2) return;

        if (isNext) {
            if (slide == banners.length - 1) setSlide(0);
            else setSlide(slide + 1);
        } else {
            if (slide == 0) setSlide(banners.length - 1);
            else setSlide(slide - 1);
        }

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
                                onClick={() => shuffle(false)}
                            />
                            <Image
                                className='banner'
                                ref={imageRef}
                                src={banners[slide]}
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
                    ) : (
                        <></>
                    ),
                [banners, slide]
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
