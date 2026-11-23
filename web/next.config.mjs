/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: isGithubPages ? "export" : "standalone",
  basePath: isGithubPages ? basePath : "",
  assetPrefix: isGithubPages && basePath ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages ? true : false,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: isGithubPages ? true : false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  ...(isGithubPages
    ? {}
    : {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://localhost:8001/api/:path*",
            },
          ];
        },
      }),
};

export default nextConfig;
