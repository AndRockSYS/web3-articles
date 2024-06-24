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
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000', //'https://web3-articles.vercel.app',
        NEXT_PUBLIC_MODULE_ADDRESS:
            'f0079fb1bd2bc0b07fd79338be86d9a89d87c9a7ba0f4960f544c481910a8d4d',
        NEXT_PUBLIC_OWNER: '5d49fe998ce0f9969d4ccbf67e7496c2a5d5f3826296d56673246f43c817b56a',
    },
};

export default nextConfig;
