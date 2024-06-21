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
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NEXT_PUBLIC_MODULE_ADDRESS:
            '17b0b02730e279de1929daf21beafeadc164ac5d844699c04e0fafb2b5026084',
    },
};

export default nextConfig;
