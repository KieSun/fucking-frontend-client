import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import 'github-markdown-css';
import ReactMarkdown from 'react-markdown';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('', js);

const renderers = {
  code: ({ value = '', language = 'javascript' }) => {
    return (
      <SyntaxHighlighter
        style={github}
        language={'javascript'}
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
