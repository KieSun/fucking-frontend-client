import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css';
import ReactMarkdown from 'react-markdown';

const renderers = {
  code: ({ value = '', language = 'javascript' }) => {
    return (
      <SyntaxHighlighter
        style={a11yDark}
        language={language}
        children={value}
      />
    );
  },
};

export default ({ content }: { content: string }) => {
  const newContent = content.replace('[去答题](#issue-comment-box)', '');
  return (
    <div className="markdown-body">
      <ReactMarkdown
        renderers={renderers}
        allowDangerousHtml
        linkTarget="_blank"
      >
        {newContent}
      </ReactMarkdown>
    </div>
  );
};
