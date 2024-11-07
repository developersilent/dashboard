/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.cache = false;
        }
        return config;
    },
};

module.exports = nextConfig;