"use client";

import { useState, useMemo } from "react";
import { Code2, List, Copy, Check, Download, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  xml: string;
  totalCount: number;
}

// Syntax-highlight XML string → HTML string
function highlightXml(xml: string): string {
  return xml
    // Escape HTML first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Re-color XML tags: opening tags
    .replace(
      /(&lt;\/?)([a-zA-Z][a-zA-Z0-9_:-]*)([^&]*?)(\/?>)/g,
      (_, slash, tag, attrs, close) => {
        const coloredAttrs = attrs.replace(
          /([a-zA-Z][a-zA-Z0-9_:-]*)=("[^"]*")/g,
          '<span style="color:#a5d6ff">$1</span><span style="color:#e2e8f0">=</span><span style="color:#ffd580">$2</span>'
        );
        return `<span style="color:#7dd3fc">${slash}</span><span style="color:#86efac">${tag}</span>${coloredAttrs}<span style="color:#7dd3fc">${close}</span>`;
      }
    )
    // XML declaration
    .replace(
      /(&lt;\?xml[^&]*?\?&gt;)/g,
      '<span style="color:#94a3b8">$1</span>'
    )
    // Content text between tags (URLs, dates, values)
    .replace(
      /(&gt;)([^&<]+)(&lt;)/g,
      (_, open, content, close) => {
        // URLs
        if (content.startsWith("http")) {
          return `${open}<span style="color:#fda4af">${content}</span>${close}`;
        }
        // Dates (YYYY-MM-DD)
        if (/^\d{4}-\d{2}-\d{2}/.test(content.trim())) {
          return `${open}<span style="color:#c4b5fd">${content}</span>${close}`;
        }
        // Priority / changefreq
        return `${open}<span style="color:#fde68a">${content}</span>${close}`;
      }
    );
}

export function SitemapXmlViewer({ xml, totalCount }: Props) {
  const [view, setView]         = useState<"xml" | "list">("xml"); // default: XML view
  const [copied, setCopied]     = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const highlighted = useMemo(() => highlightXml(xml), [xml]);

  // Parse URL entries for list view
  const entries = useMemo(() => {
    const matches = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)];
    return matches.map((m) => {
      const loc        = m[0].match(/<loc>([^<]+)<\/loc>/)?.[1]        ?? "";
      const lastmod    = m[0].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "";
      const changefreq = m[0].match(/<changefreq>([^<]+)<\/changefreq>/)?.[1] ?? "";
      const priority   = m[0].match(/<priority>([^<]+)<\/priority>/)?.[1]   ?? "";
      return { loc, lastmod, changefreq, priority };
    });
  }, [xml]);

  function handleCopy() {
    navigator.clipboard.writeText(xml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([xml], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sitemap.xml";
    a.click();
  }

  const priorityColor = (p: string) => {
    const n = parseFloat(p);
    if (n >= 0.9) return "#22c55e";
    if (n >= 0.7) return "#3b82f6";
    if (n >= 0.5) return "#f59e0b";
    return "#94a3b8";
  };

  return (
    <div className="mb-12 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0f172a] border-b border-white/10">
        <div className="flex items-center gap-3">
          <Code2 className="w-4 h-4 text-[#4eafc4]" />
          <span className="text-white/80 text-sm font-semibold tracking-wide">sitemap.xml</span>
          <span className="text-[10px] bg-[#4eafc4]/20 text-[#4eafc4] px-2 py-0.5 rounded-full font-semibold">
            {totalCount} URLs
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setView("xml")}
              className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                view === "xml" ? "bg-[#4eafc4] text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              <Code2 className="w-3 h-3" /> XML
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                view === "list" ? "bg-[#4eafc4] text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              <List className="w-3 h-3" /> Table
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={handleCopy}
            title="Copy XML"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownload}
            title="Download sitemap.xml"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expand" : "Collapse"}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* XML view */}
          {view === "xml" && (
            <div
              className="overflow-auto"
              style={{ maxHeight: "520px", background: "#0d1117" }}
            >
              <pre
                className="p-5 text-xs leading-6 font-mono select-all"
                style={{ minWidth: "max-content" }}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </div>
          )}

          {/* Table / list view */}
          {view === "list" && (
            <div className="overflow-auto" style={{ maxHeight: "520px" }}>
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider w-1/2">URL</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider">Last Modified</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider">Freq</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {entries.map((e, i) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-2.5">
                        <a
                          href={e.loc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {e.loc}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{e.lastmod}</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                          {e.changefreq}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                          style={{ background: priorityColor(e.priority) }}
                        />
                        {e.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Generated · {new Date().toLocaleDateString("en-PK", { dateStyle: "medium" })} · ISR 1h
            </span>
            <div className="flex gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Open sitemap.xml ↗
              </a>
              <a
                href="/sitemap_index.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Open sitemap_index.xml ↗
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
