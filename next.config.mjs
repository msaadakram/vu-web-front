/** @type {import('next').NextConfig} */
const nextConfig = {
  // Re-enabled: StrictMode catches double-render bugs and deprecated API usage in dev
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
  // For local dev:  add BACKEND_URL=http://localhost:5000 to .env.local
  // For production: set BACKEND_URL in your Vercel / Heroku config vars.
  //
  // If BACKEND_URL is not set we skip the rewrite rule instead of crashing
  // the build — this lets Vercel run the build step before you wire up the
  // env var, and the rewrite simply won't be active until the var is set.
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      console.warn(
        "[next.config] WARNING: BACKEND_URL is not set — /api/* rewrites are disabled.\n" +
          "  - For local dev: add BACKEND_URL=http://localhost:5000 to .env.local\n" +
          "  - For production: set BACKEND_URL in your Vercel / Heroku config vars."
      );
      return [];
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
