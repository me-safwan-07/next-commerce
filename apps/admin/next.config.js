/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    poweredByHeader: false,
    transpilePackages: ["@e-commerce/database", "@e-commerce/ui", "@e-commerce/lib"],
};

export default nextConfig;
