'use client'; // Indicate this is a Client Component (if using Next.js)

import { FC, useState, useEffect } from 'react';
import { markdownToReact } from '@/lib/markdown';

interface Props {
  source: string;
}

const MarkdownViewer: FC<Props> = ({ source }) => {
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const renderMarkdown = async () => {
      const rendered = await markdownToReact(source);
      setContent(rendered);
    };
    renderMarkdown();
  }, [source]);

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {content}
    </article>
  );
};

export default MarkdownViewer;