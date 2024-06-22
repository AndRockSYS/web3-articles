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
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000', //https://web3-articles.vercel.app',
        NEXT_PUBLIC_MODULE_ADDRESS:
            '17b0b02730e279de1929daf21beafeadc164ac5d844699c04e0fafb2b5026084',
        NEXT_PUBLIC_OWNER: '5d49fe998ce0f9969d4ccbf67e7496c2a5d5f3826296d56673246f43c817b56a',
    },
};

export default nextConfig;
