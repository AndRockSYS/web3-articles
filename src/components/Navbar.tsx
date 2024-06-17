'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWalletName } from 'petra-plugin-wallet-adapter';

import './navbar.css';

export default function Navbar() {
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
            <h1>Mirror Copy</h1>
            <div>
                {useMemo(() => {
                    if (account)
                        return (
                            <Link href='/add-article'>
                                <Image
                                    src='/icons/create-article.svg'
                                    alt='wallet'
                                    height={32}
                                    width={32}
                                />
                                Create
                            </Link>
                        );
                }, [account])}
                <button
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
