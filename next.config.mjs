// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['grammy', 'puppeteer', 'socket.io'],
    },
};

export default nextConfig;
