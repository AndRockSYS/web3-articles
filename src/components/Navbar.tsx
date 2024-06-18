'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWalletName } from 'petra-plugin-wallet-adapter';

import './navbar.css';

export default function Navbar() {
    const path = usePathname();

    const { connect, account } = useWallet();

    const buttonMessage = useMemo(
        () =>
            account
                ? account.address.slice(0, 4) + '...' + account.address.slice(62, 66)
                : 'Connect',
        [account]
    );

    return (
        <nav>
            <Link className='empty' href={'/'}>
                <h1>Mirror Copy</h1>
            </Link>
            <div>
                {useMemo(() => {
                    if (account)
                        return path.includes('add-article') ? (
                            <button id='blue-button'>
                                <Image
                                    src={'/icons/send.svg'}
                                    alt='send'
                                    width={32}
                                    height={32}
                                ></Image>
                                Publish
                            </button>
                        ) : (
                            <Link id='blue-button' href='/add-article'>
                                <Image
                                    src='/icons/create-article.svg'
                                    alt='wallet'
                                    height={32}
                                    width={32}
                                />
                                Create
                            </Link>
                        );
                }, [account, path])}
                <button
                    id='blue-button'
                    onClick={() => {
                        if ('aptos' in window) connect(PetraWalletName);
                        else window.open('https://petra.app/', `_blank`);
                    }}
                >
                    <Image src='/icons/wallet.svg' alt='wallet' height={32} width={32} />
                    {buttonMessage}
                </button>
            </div>
        </nav>
    );
}
