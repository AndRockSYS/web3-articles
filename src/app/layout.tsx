import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import Navbar from '@/components/Navbar';
import { ArticleProvider } from '@/context/ArticleProvider';
import AptosProvider from '@/context/AptosProvider';

import './globals.css';
import '@/styles/buttons.css';
const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
    title: 'Letsdyor',
    description: 'Web3 Articles only Here',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <AptosProvider>
                <ArticleProvider>
                    <body className={sans.className}>
                        <Navbar />
                        {children}
                    </body>
                </ArticleProvider>
            </AptosProvider>
        </html>
    );
}
