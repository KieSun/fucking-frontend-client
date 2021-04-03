import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import styles from './index.less';

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
  heading: ({ level, children }) => {
    const value = children[0].props.value;
    switch (level) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2 id={value}>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      default:
        return <h6>{children}</h6>;
    }
  },
};

export default ({ content }: { content: string }) => {
  const newContent = content.replace('[去答题](#issue-comment-box)', '');
  return (
    <div className={styles.markdownBody}>
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
