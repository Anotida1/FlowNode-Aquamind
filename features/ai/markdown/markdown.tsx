"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
    content: string;
}

export function Markdown({ content }: MarkdownProps) {
    return (
        <div className="text-sm leading-6 text-foreground">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Paragraphs
                    p: ({ children }) => (
                        <p className="mb-2 last:mb-0 leading-6">{children}</p>
                    ),

                    // Headings
                    h1: ({ children }) => (
                        <h1 className="mt-4 mb-2 text-xl font-bold first:mt-0">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mt-3 mb-1.5 text-lg font-semibold first:mt-0">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mt-3 mb-1 text-base font-semibold first:mt-0">
                            {children}
                        </h3>
                    ),

                    // Unordered lists
                    ul: ({ children }) => (
                        <ul className="mb-2 ml-5 list-disc space-y-1">{children}</ul>
                    ),

                    // Ordered lists
                    ol: ({ children }) => (
                        <ol className="mb-2 ml-5 list-decimal space-y-1">{children}</ol>
                    ),

                    // List items
                    li: ({ children }) => (
                        <li className="pl-1 leading-6">{children}</li>
                    ),

                    // Bold
                    strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                    ),

                    // Italic
                    em: ({ children }) => (
                        <em className="italic">{children}</em>
                    ),

                    // Inline code
                    code: ({ children, className }) => {
                        const isCodeBlock = className?.includes("language-");

                        if (isCodeBlock) {
                            return (
                                <code className={className}>
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
                                {children}
                            </code>
                        );
                    },

                    // Code blocks
                    pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto rounded-lg bg-muted p-3 text-sm">
                            {children}
                        </pre>
                    ),

                    // Links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-2 hover:opacity-80"
                        >
                            {children}
                        </a>
                    ),

                    // Blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className="my-2 border-l-2 pl-3 italic text-muted-foreground">
                            {children}
                        </blockquote>
                    ),

                    // Horizontal rule
                    hr: () => <hr className="my-3 border-border" />,

                    // Tables
                    table: ({ children }) => (
                        <div className="my-3 overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="border-b">{children}</thead>
                    ),

                    th: ({ children }) => (
                        <th className="px-3 py-2 text-left font-semibold">{children}</th>
                    ),

                    td: ({ children }) => (
                        <td className="border-b px-3 py-2">{children}</td>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}