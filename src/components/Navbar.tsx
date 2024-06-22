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
                <h1>Letsdyor</h1>
            </Link>
            <div>
                {useMemo(() => {
                    if (!account || path.includes('add-article') || path.includes('apply'))
                        return <></>;

                    return (
                        <>
                            <Link id='blue-button' href='/add-article'>
                                <Image
                                    src='/icons/create-article.svg'
                                    alt='wallet'
                                    height={32}
                                    width={32}
                                />
                                Create
                            </Link>
                            <Link id='blue-button' href='/apply'>
                                <Image src='/icons/mail.svg' alt='mail' height={32} width={32} />
                                Apply
                            </Link>
                        </>
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
