import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const isProduction = process.env.NODE_ENV === 'production';

const pwaConfig = withPWA({
    dest: 'public',
    disable: !isProduction,
    register: true,
    skipWaiting: true,
    runtimeCaching
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    publicRuntimeConfig: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_MESSAGE_API_URL: process.env.NEXT_MESSAGE_API_URL,
    },
    ...pwaConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sun151-1.userapi.com',
            },
        ],
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default nextConfig;
