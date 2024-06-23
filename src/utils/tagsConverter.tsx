'use client';

import Image from 'next/image';

import '@/styles/tags.css';

export function toAuthorTag(address: string): JSX.Element {
    const author = address.slice(0, 4) + '...' + address.slice(62, 66);

    return (
        <div id='user'>
            <Image src={'/icons/user.svg'} alt='user-icon' height={32} width={32}></Image>
            <h4>{author}</h4>
        </div>
    );
}

export function toDateTag(timestamp: number): JSX.Element {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });

    return (
        <div id='date'>
            <Image src={'/icons/date.svg'} alt='date-icon' height={32} width={32}></Image>
            <h4>{`${day} ${month}`}</h4>
        </div>
    );
}

export function toTag(tag: string, func?: (...args: any) => void): JSX.Element {
    return (
        <h4
            id='tag'
            onClick={() => {
                if (func) func('');
            }}
        >
            {tag}
        </h4>
    );
}
