import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-inherit opacity-80 hover:opacity-100 transition-opacity">
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-black/8 text-[13px] font-mono" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre className="overflow-x-auto rounded-xl bg-[#1c3557] p-4 mb-3 mt-1">
        <code className={`${className || ""} text-[13px] leading-relaxed text-white font-mono`} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  pre: ({ children }) => <>{children}</>,
  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-3 border-[#4eafc4]/40 pl-3 py-1 mb-2 italic opacity-80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-[#1c3557]/10" />,
};

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
