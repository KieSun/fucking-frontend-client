import React, { useCallback, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import styles from './index.less';
import { getLockStatus } from '@/api';
import { getCookie } from './utils';

const cookie = getCookie() || '';
const token = cookie.slice(cookie.length - 6);

const renderers = {
  code: ({ value = '', language = 'javascript' }) => {
    return (
      <SyntaxHighlighter
        style={a11yDark}
        language={language}
        children={value}
        showLineNumbers
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

let timer: NodeJS.Timeout;

export default ({
  content,
  needLock = false,
}: {
  content: string;
  needLock?: boolean;
}) => {
  const newContent = content.replace('[去答题](#issue-comment-box)', '');
  const [isLocked, setIsLocked] = useState(false);
  const [articleContent, setArticleContent] = useState(newContent);
  useEffect(() => {
    fetchData();
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!needLock) return;
    const { locked = true } = await getLockStatus(token);
    if (locked) {
      if (!isLocked) {
        setIsLocked(true);
        setArticleContent(newContent);
        setTimeout(() => {
          clearInterval(timer);
        }, 60000);
      }
    } else {
      if (!isLocked) {
        setArticleContent(newContent.slice(0, 1000));
        if (!timer) {
          timer = setInterval(() => {
            fetchData();
          }, 5000);
        }
      }
    }
  }, [isLocked]);

  return (
    <div className={styles.markdownBody}>
      <ReactMarkdown
        renderers={renderers}
        allowDangerousHtml
        linkTarget="_blank"
      >
        {articleContent}
      </ReactMarkdown>
      {needLock && !isLocked ? (
        <div className={styles.locker}>
          <div className={styles.mask} />
          <div className="info">
            <div>
              <p className="text-center">
                扫码或搜索：
                <strong>前端真好玩</strong>
              </p>
              <p className="text-center">
                <span>
                  发送验证码 <strong>{token}</strong>
                </span>
              </p>
              <p className="text-center">
                关注期间<strong>无限制</strong>
                浏览本站所有内容，助你一年内薪资上涨 5K 以上
              </p>
            </div>
            <div className="text-center">
              <img
                width={400}
                src="https://yck-1254263422.file.myqcloud.com/20191223215610.jpeg"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
