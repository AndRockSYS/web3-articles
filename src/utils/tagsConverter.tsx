'use client';

import Image from 'next/image';

import '@/styles/tags.css';

export function toAuthorTag(address: string): JSX.Element {
    const author = address.slice(0, 4) + '...' + address.slice(62, 66);

    return (
        <div id='user'>
            <Image src={'/icons/user.svg'} alt='user-icon' height={32} width={32}></Image>
            <h3>{author}</h3>
        </div>
    );
}

export function toDateTag(timestamp: number): JSX.Element {
    const date = new Date(timestamp);

    return (
        <div id='date'>
            <Image src={'/icons/date.svg'} alt='date-icon' height={32} width={32}></Image>
            <h3>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</h3>
        </div>
    );
}

export function toTags(tags: string, func?: (...args: any) => void): JSX.Element {
    if (!tags) return <></>;
    const tagArray = tags.split('/');

    return (
        <div id='tags'>
            {tagArray.map((tag) => (
                <div
                    key={tag}
                    id='tag'
                    onClick={() => {
                        if (func) func(tag);
                    }}
                >
                    {tag}
                </div>
            ))}
        </div>
    );
}
