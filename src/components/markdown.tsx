import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import 'github-markdown-css';
import ReactMarkdown from 'react-markdown';

SyntaxHighlighter.registerLanguage('js', js);

const renderers = {
  code: ({ value = '', language = 'javascript' }) => {
    return (
      <SyntaxHighlighter style={github} language={language} children={value} />
    );
  },
};

export default ({ content }: { content: string }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>
    </div>
  );
};