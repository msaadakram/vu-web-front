import { type MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/sitemap";

const BASE_URL = getBaseUrl();

export const revalidate = 3600;

// AI grounding/citation crawlers are ALLOWED so the site can be cited in
// ChatGPT, Google AI Overviews, Perplexity, and Claude. Training is withheld
// via the Content-Signal header (ai-train=no, use=reference) emitted by the
// CDN. Do NOT re-block these crawlers at the robots layer — that suppresses
// all AI search visibility. Cloudflare's "Block AI Bot" setting must also be
// disabled for the same user-agents, otherwise the CDN-injected Disallow
// overrides the rules below.
const AI_GROUNDING_BOTS = [
  "GPTBot",        // OpenAI / ChatGPT
  "OAI-SearchBot", // OpenAI web search
  "Google-Extended", // Google AI Overviews grounding
  "PerplexityBot", // Perplexity
  "PerplexityBot-1", // Perplexity (alternate)
  "ClaudeBot",     // Anthropic / Claude
  "Claude-Web",   // Anthropic web (legacy)
  "CCBot",         // Bing Copilot / common crawl (reference use only)
];

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: ["/", "/_next/static/"],
      disallow: ["/api/", "/admin/", "/login", "/register", "/upload", "/_next/static/media/", "/_next/image"],
    },
    {
      userAgent: "Googlebot",
      allow: ["/", "/_next/static/"],
      disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
      crawlDelay: 1,
    },
    {
      userAgent: "Bingbot",
      allow: ["/", "/_next/static/"],
      disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
      crawlDelay: 2,
    },
    // Explicitly allow AI grounding/citation crawlers. Training rights are
    // reserved via the Content-Signal header, not by blocking crawling.
    ...AI_GROUNDING_BOTS.map((ua) => ({
      userAgent: ua,
      allow: ["/"],
      disallow: ["/api/", "/admin/", "/login", "/register", "/upload"],
    })),
    // Training-only crawlers (no reference/grounding value) stay blocked.
    { userAgent: "Bytespider", disallow: "/" },
    { userAgent: "Amazonbot", disallow: "/" },
    { userAgent: "Applebot-Extended", disallow: "/" },
    { userAgent: "meta-externalagent", disallow: "/" },
  ];

  return {
    rules,
    sitemap: [`${BASE_URL}/sitemap_index.xml`],
    host: BASE_URL,
  };
}
