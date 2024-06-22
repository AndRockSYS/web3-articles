/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_APP_URL: 'https://web3-articles.vercel.app',
        NEXT_PUBLIC_MODULE_ADDRESS:
            '72aba4bdb1e35e08a8335002ff708105aaa0acb2aa461d962c6170aaa5115797',
        NEXT_PUBLIC_OWNER: '5d49fe998ce0f9969d4ccbf67e7496c2a5d5f3826296d56673246f43c817b56a',
    },
};

export default nextConfig;
