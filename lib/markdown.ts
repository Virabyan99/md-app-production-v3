import { createHighlighter } from 'shiki';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import { createElement, Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// Initialize Shiki highlighter once
const highlighterPromise = createHighlighter({
  themes: ['github-light-default'], // Load the desired theme
  langs: [ 'javascript', 'typescript', 'python', 'jsx', 'tsx', 'json', 'yaml', 'bash', 'css', 'html',
    'java', 'cpp', 'csharp', 'ruby', 'go', 'php', 'sql', 'rust', 'kotlin'], // Add languages as needed
});

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkSmartypants, { dashes: 'oldschool' })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSanitize, {
    tagNames: [
      'a', 'abbr', 'b', 'blockquote', 'code', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'i', 'img', 'kbd', 'li', 'ol', 'p', 'pre', 'strong', 'ul', 'table', 'thead',
      'tbody', 'tr', 'th', 'td', 'del', 'hr', 'br', 'span'
    ],
    attributes: {
      a: ['href', 'title', 'rel', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['className'],
    },
    protocols: { a: { href: ['http', 'https', 'mailto', 'tel', 'relative'] } },
  })
  .use(rehypePrettyCode, {
    getHighlighter: () => highlighterPromise,
    theme: 'github-light-default', // Specify the theme to match the loaded one
    keepBackground: false,
  })
  .use(rehypeReact, {
    createElement,
    Fragment,
    jsx,
    jsxs,
  });

export async function markdownToReact(markdown: string): Promise<JSX.Element> {
  const result = await processor.process(markdown);
  return result.result as JSX.Element;
}