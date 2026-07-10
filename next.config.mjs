/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Proxy client-side /api/* calls to the backend.
  // BACKEND_URL is a server-side env var (must be set before `next build`).
  // For local dev: add BACKEND_URL=http://localhost:5000 to .env.local
  // For production (Heroku/Vercel): set BACKEND_URL to your deployed backend URL.
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error(
        "BACKEND_URL environment variable is not set.\n" +
        "  - For local dev: add BACKEND_URL=http://localhost:5000 to .env.local\n" +
        "  - For production: set BACKEND_URL to your deployed backend URL in your hosting dashboard (e.g. Heroku/Vercel config vars)"
      );
    }
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
