/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    serverExternalPackages: ['paystack-node', 'got', 'cacheable-request', 'keyv'],
};

export default nextConfig;
