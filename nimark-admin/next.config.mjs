/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
    async headers() {
        return [
        {
            source: '/(.*)',
            headers: securityHeaders,
        },
        ];
    },
};

export default nextConfig;
